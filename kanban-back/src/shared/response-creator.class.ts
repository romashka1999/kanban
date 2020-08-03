export class ResponseCreator {
    private timestamp: string;
    private statusCode: number;
    private success: boolean;
    private data: any;
    private route: { url: string; method: string };

    constructor(statusCode: number, success: boolean, url: string, method: string, data: any) {
        this.timestamp = new Date().toISOString();
        this.statusCode = statusCode;
        this.route = { url, method };
        this.success = success;
        this.data = data;
    }
}
