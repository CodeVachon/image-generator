import { createCanvas, Canvas } from "canvas";

/**
 * wrapText takes the incoming text and fits it the context of the image.
 * Nothing is returned as the text value is applied directly to the canvas context.
 * @param context The Context to Apply Text To
 * @param text The Text to be applied to the Context
 * @param lineHeight The Line Height Used when breaking the Text value across multiple lines
 */
function wrapText(context: CanvasRenderingContext2D, text: string, lineHeight: number): void {
    const words = text.split(new RegExp("[\\s\\n\\r]{1,}", "g")).map(word => word.trim());
    const lines = [];
    const maxWidth = context.canvas.width * 0.85;
    let currentLine: Array<string> = [];

    words.forEach(word => {
        const testWidth = context.measureText(currentLine.join(" ") + " " + word).width;
        if (testWidth > maxWidth) {
            lines.push(currentLine.join(" "));
            currentLine = [];
        }
        currentLine.push(word);
    });

    if (currentLine.length > 0) {
        lines.push(currentLine.join(" "));
    }

    const middleX = (context.canvas.width / 2);
    const middleY = (context.canvas.height / 2) + (lineHeight / 2);
    let lineOffset = middleY - ((lines.length / 2) * lineHeight);

    lines.forEach((line: string, index: number) => {
        context.fillText(line, middleX, lineOffset + (index * lineHeight));
    });
} // close wrapText

/** Optional Configuration Values for the generated image */
interface ExpectedConfigObject {
    /** Font Size in `px`. Default: `40` */
    fontSize?: number,
    /** Font Used. Default: `Arial` */
    font?: string,
    /** Text Colour Used. Default: `#999` */
    textColor?: string,
    /** The Fill Colour used as the background. This can be an Array of Colours or a Single Colour. Default: `#eee` */
    fillColor?: string | Array<string>,
    /** If Fill Colour is an Array of Colours, this sets the gradient pattern used.  Default: `radial` */
    gradientType?: "radial" | "linear",
    /** the colour of the border of the image. Default `#999` */
    borderColor?: string,
    /** the width of the border of the image in `px`. Default `4` */
    borderWidth?: number,
    /** the Width of the image in `px`. Default `400` */
    width?: number,
    /** the Height of the image in `px`. Default `400` */
    height?: number
} // close ExpectedConfigObject


/**
 * defaultImage Generates a png image with the text provided vertically and horizontally aligned to center.
 * @param text The Text Used on the Image
 * @param options The optional settings for the image
 * @returns the png/base64 encoded dataurl to used as an image source
 */
function defaultImage(text: string = "", options?: ExpectedConfigObject): string {
    const settings = Object.assign({
        fontSize: 40,
        font: "Arial",
        textColor: "#999",
        fillColor: "#eee",
        gradientType: "radial",
        borderColor: "#999",
        borderWidth: 4,
        width: 400,
        height: 400
    }, options);

    if (!text || text.length === 0) {
        text = `${settings.width}x${settings.height}`;
    }

    const canvas: Canvas = createCanvas(settings.width, settings.height);
    const context: CanvasRenderingContext2D = canvas.getContext("2d");

    if (Array.isArray(settings.fillColor)) {
        if (settings.fillColor.length <= 1) {
            context.fillStyle = settings.fillColor[0] || "#ccc";
        } else {
            const totalColors = (settings.fillColor.length - 1);
            let gradient: CanvasGradient;

            if (settings.gradientType === "linear") {
                gradient = context.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height);
            } else {
                gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.height * 0.1, canvas.width / 2, canvas.height / 2, canvas.height);
            }

            settings.fillColor.forEach((color: string, index: number) => {
                let value = index;

                if (index > 0) {
                    value = (index / totalColors);
                }

                gradient.addColorStop(value, color);
            });
            context.fillStyle = gradient;
        }
    } else {
        context.fillStyle = settings.fillColor;
    } // close if (Array.isArray(rectFill))

    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = settings.borderColor;
    context.lineWidth = settings.borderWidth;
    const borderWidthOffset = settings.borderWidth / 2;
    context.strokeRect(
        borderWidthOffset,
        borderWidthOffset,
        canvas.width - (borderWidthOffset * 2),
        canvas.height - (borderWidthOffset * 2)
    );

    context.fillStyle = settings.textColor;
    context.font = `${settings.fontSize}px ${settings.font}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    wrapText(context, text, settings.fontSize * 1.3);

    return canvas.toDataURL();
} // close defaultImage

export default defaultImage;
export {
    defaultImage,
    wrapText
}
