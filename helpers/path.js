const path = require("path");

class pathHelper {
    static get projectDir() {
        return path.normalize(`${__dirname}\\..`);
    }

    static getRelativePath(sourcePath, targetPath) {
        let fullTargetPath = path.join(pathHelper.projectDir, targetPath);
        let relativePath = path.relative(sourcePath, fullTargetPath);
        relativePath = relativePath.startsWith(".") ? relativePath : '.' + path.join("\\", relativePath);
        return relativePath;
    }

    static getAbsolutePath(sourcePath, targetPath) {
        sourcePath = sourcePath.replace(/\//g, '\\');
        targetPath = targetPath.replace(/\//g, '\\');

        let fullTargetPath = path.join(pathHelper.projectDir, targetPath);
        return fullTargetPath;
    }

    static getFilePath(assignablePath, filePath) {
        let directory = this.getAbsolutePath(this.projectDir, assignablePath);
        filePath = filePath.replace(/\//g, '\\');
        let finalFilePath = path.join(directory, filePath);
        finalFilePath = path.normalize(finalFilePath);
        if (!finalFilePath.toLowerCase().startsWith(directory.toLowerCase())) return false;
        return finalFilePath;
    }
};

module.exports = pathHelper;