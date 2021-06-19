import DataSource from "./DataSource.js";
import logger from "../util/SimpleDebug.js";
import data from "./questions.js";


class FileDataSourceDelegate extends DataSource {

    loadQuestions() {
        logger.log("Loading Questions", 5);
        logger.log(data);
        return data;
    }
}

export default FileDataSourceDelegate;
