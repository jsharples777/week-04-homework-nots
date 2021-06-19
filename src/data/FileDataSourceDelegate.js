import DataSource from "./DataSource.js";
import logger from "../util/SimpleDebug.js";
import * as data from "./questions.json";


class FileDataSourceDelegate extends DataSource {

    loadQuestions() {
        logger.log("Loading Questions", 5);
        logger.log(data.default);
        return data.default;
    }
}

export default FileDataSourceDelegate;
