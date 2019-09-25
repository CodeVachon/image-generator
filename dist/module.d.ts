/**
 * wrapText takes the incoming text and fits it the context of the image.
 * Nothing is returned as the text value is applied directly to the canvas context.
 * @param context The Context to Apply Text To
 * @param text The Text to be applied to the Context
 * @param lineHeight The Line Height Used when breaking the Text value across multiple lines
 */
declare function wrapText(context: CanvasRenderingContext2D, text: string, lineHeight: number): void;
/** Optional Configuration Values for the generated image */
interface ExpectedConfigObject {
    /** Font Size in `px`. Default: `40` */
    fontSize?: number;
    /** Font Used. Default: `Arial` */
    font?: string;
    /** Text Colour Used. Default: `#999` */
    textColor?: string;
    /** The Fill Colour used as the background. This can be an Array of Colours or a Single Colour. Default: `#eee` */
    fillColor?: string | Array<string>;
    /** If Fill Colour is an Array of Colours, this sets the gradient pattern used.  Default: `radial` */
    gradientType?: "radial" | "linear";
    /** the colour of the border of the image. Default `#999` */
    borderColor?: string;
    /** the width of the border of the image in `px`. Default `4` */
    borderWidth?: number;
    /** the Width of the image in `px`. Default `400` */
    width?: number;
    /** the Height of the image in `px`. Default `400` */
    height?: number;
}
/**
 * defaultImage Generates a png image with the text provided vertically and horizontally aligned to center.
 * @param text The Text Used on the Image
 * @param options The optional settings for the image
 * @returns the png/base64 encoded dataurl to used as an image source
 */
declare function defaultImage(text?: string, options?: ExpectedConfigObject): string;
export default defaultImage;
export { defaultImage, wrapText };
