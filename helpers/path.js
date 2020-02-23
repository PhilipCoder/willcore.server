const path = require("path");

class pathHelper {
    static get projectDir() {
        return path.normalize(`${__dirname}\\..`);
    }

    static getRelativePath(sourcePath, targetPath) {
        let fullTargetPath = path.join(pathHelper.projectDir, targetPath);
        let relativePath = path.relative(sourcePath,fullTargetPath);
        relativePath = relativePath.startsWith(".") ? relativePath : '.'+path.join("\\",relativePath);
        return relativePath;
    }
};

module.exports = pathHelper;