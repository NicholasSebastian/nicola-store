import sanity from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);
const imageUrlFor = source => imageBuilder.image(source);

export default imageUrlFor;
