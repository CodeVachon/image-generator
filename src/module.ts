import { createCanvas, Canvas } from "canvas";

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

interface ExpectedConfigObject {
    fontSize?: number,
    font?: string,
    textColor?: string,
    fillColor?: string | Array<string>,
    gradientType?: "radial" | "linear",
    borderColor?: string,
    borderWidth?: number,
    width?: number,
    height?: number
} // close ExpectedConfigObject

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
