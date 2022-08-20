import fs from "fs";
import request from "superagent";

const agent = request.agent();

export class GetFile {
    private static downloadFile(filePath: string, localPath: string) {
        new Promise((resolve) => {
            agent
                .get(filePath)
                .pipe(fs.createWriteStream(localPath))
                .on("finish", resolve);
        });
    }

    static deleteFile(localPath: string) {
        fs.unlinkSync(localPath);
    }

    /**
     * Gets the size of a file
     * @param filePath The location of the remote file
     * @param localPath The location of the locally saved file
     * @todo Remove requirement to download the file. Clean up downloaded file
     * @returns The size in bytes as a number for a provided file
     */
    static async getFileSize(
        filePath: string,
        localPath: string
    ): Promise<number> {
        return Promise.resolve(this.downloadFile(filePath, localPath)).then(
            () => Promise.resolve(fs.statSync(localPath).size)
        );
    }
}
