import { sheets_v4 } from '@googleapis/sheets';
import getClient from './googleapi';

class Sheets {
  private instance: sheets_v4.Sheets;
  private spreadsheetId: string;

  private constructor(client: sheets_v4.Sheets, sheetId: string) {
    this.instance = client;
    this.spreadsheetId = sheetId;
  }

  public static async getInstance(sheetId: string) {
    const { sheets } = await getClient();
    return new Sheets(sheets, sheetId);
  }

  public async getSheets() {
    const { data } = await this.instance.spreadsheets.get({ spreadsheetId: this.spreadsheetId });
    return data.sheets;
  }

  public async getSheet(sheet: string) {
    const sheets = await this.getSheets();
    return sheets.find(s => s.properties.title === sheet);
  }

  public async getRows(sheet: string, rangeFrom: string, rangeTo: string) {
    console.log(`Fetching rows from range '${sheet}!${rangeFrom}:${rangeTo}'.`); // LOG
    const { data } = await this.instance.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `${sheet}!${rangeFrom}:${rangeTo}`
    });

    console.log(`${data.values.length} rows found.`); // LOG
    return data.values;
  }

  public async addSheet(title: string) {
    console.log(`Adding a new sheet with name '${title}'.`); // LOG
    const response = await this.instance.spreadsheets.batchUpdate({ 
      spreadsheetId: this.spreadsheetId,
      requestBody: {
        requests: [
          { addSheet: { properties: { title } } }
        ]
      } 
    });

    // Return the new sheet.
    return response.data.replies[0].addSheet;
  }

  public async addRow(sheet: string, row: any[]) {
    await this.addRows(sheet, [row]);
  }

  public async addRows(sheet: string, rows: any[][]) {
    const rangeStart = 'A';
    const rangeEnd = String.fromCharCode(rangeStart.charCodeAt(0) + rows[0].length - 1);

    console.log(`Adding ${rows.length} row(s) to range '${sheet}!${rangeStart}:${rangeEnd}'.`); // LOG
    await this.instance.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId, 
      range: `${sheet}!${rangeStart}:${rangeEnd}`,
      valueInputOption: "RAW",
      requestBody: { values: rows }
    });
  }

  public async formatCellAsNumber(cell: ISimpleRange, minValue = 0) {
    const { sheetId, rowIndex, columnIndex } = cell;
    const range: IRange = {
      sheetId,
      startRowIndex: rowIndex,
      endRowIndex: rowIndex + 1,
      startColumnIndex: columnIndex,
      endColumnIndex: columnIndex + 1
    };

    await this.formatRangeAsNumber(range, minValue);
  }

  public async formatCellAsEnum(cell: ISimpleRange, values: Array<string>) {
    const { sheetId, rowIndex, columnIndex } = cell;
    const range: IRange = {
      sheetId,
      startRowIndex: rowIndex,
      endRowIndex: rowIndex + 1,
      startColumnIndex: columnIndex,
      endColumnIndex: columnIndex + 1
    };

    await this.formatRangeAsEnum(range, values);
  }

  public async formatRangeAsNumber(range: IRange, minValue = 0) {
    const MESSAGE = `The value must be a number greater than ${minValue}.`;
    const condition: ICondition = {
      type: "NUMBER_GREATER_THAN_EQ",
      values: [{ userEnteredValue: minValue.toString() }]
    };

    await this.setDataValidation(range, condition, MESSAGE);
  }

  public async formatRangeAsEnum(range: IRange, values: Array<string>) {
    const MESSAGE = "You must select a value from the list.";
    const condition: ICondition = {
      type: "ONE_OF_LIST",
      values: values.map(value => ({ userEnteredValue: value }))
    };

    await this.setDataValidation(range, condition, MESSAGE, true);
  }

  private async setDataValidation(range: IRange, condition: ICondition, errMessage: string, isList = false) {
    // LOG
    console.log(`Setting data validation '${condition.type}' on range (${range.startColumnIndex}, ${range.startRowIndex}) to (${range.endColumnIndex}, ${range.endRowIndex}) of sheet ID '${range.sheetId}'.`);

    await this.instance.spreadsheets.batchUpdate({
      spreadsheetId: this.spreadsheetId,
      requestBody: {
        requests: [{
          setDataValidation: {
            range,
            rule: {
              strict: true,
              condition,
              showCustomUi: isList,
              inputMessage: errMessage
            }
          }
        }]
      }
    });
  }
}

export default Sheets;

interface ISimpleRange {
  sheetId: number
  rowIndex: number
  columnIndex: number
}

interface IRange {
  sheetId: number
  startRowIndex: number,
  endRowIndex: number,
  startColumnIndex: number,
  endColumnIndex: number,
}

interface ICondition {
  type: string
  values: Array<{ userEnteredValue: string }>
}
