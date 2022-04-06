import { sheets_v4 } from '@googleapis/sheets';
import getClient from './googleapi';

class Sheets {
  private instance: sheets_v4.Sheets;
  private sheetId: string;

  private constructor(client: sheets_v4.Sheets, sheetId: string) {
    this.instance = client;
    this.sheetId = sheetId;
  }

  public static async getInstance(sheetId: string) {
    const { sheets } = await getClient();
    return new Sheets(sheets, sheetId);
  }

  public async getSheets() {
    const { data } = await this.instance.spreadsheets.get({ spreadsheetId: this.sheetId });
    return data.sheets;
  }

  public async hasSheet(sheet: string) {
    const sheets = await this.getSheets();
    return sheets.some(s => s.properties.title === sheet);
  }

  public async addSheet(title: string) {
    console.log(`Adding a new sheet with name '${title}'...`); // temp
    await this.instance.spreadsheets.batchUpdate({ 
      spreadsheetId: this.sheetId,
      requestBody: {
        requests: [
          { addSheet: { properties: { title } } },
          // TODO: Add data validation.
        ]
      } 
    });
  }

  public async addRow(sheet: string, row: any[]) {
    console.log(`Adding row with values (${row.join(',')})`); // temp
    await this.addRows(sheet, [row]);
  }

  public async addRows(sheet: string, rows: any[][]) {
    const rowLength = rows[0].length;
    const rangeStart = 'A';
    const rangeEnd = String.fromCharCode(rangeStart.charCodeAt(0) + rowLength);

    console.log(`Adding ${rows.length} row(s) to range '${sheet}!${rangeStart}:${rangeEnd}'.`); // temp
    await this.instance.spreadsheets.values.append({
      spreadsheetId: this.sheetId, 
      range: `${sheet}!${rangeStart}:${rangeEnd}`,
      valueInputOption: "RAW",
      requestBody: { values: rows }
    });
  }

  public async getRows(sheet: string, rangeFrom: string, rangeTo: string) {
    console.log(`Fetching rows from range '${sheet}!${rangeFrom}:${rangeTo}'`); // temp
    const { data } = await this.instance.spreadsheets.values.get({
      spreadsheetId: this.sheetId,
      range: `${sheet}!${rangeFrom}:${rangeTo}`
    });

    console.log(`${data.values.length} rows found.`); // temp
    return data.values;
  }
}

export default Sheets;