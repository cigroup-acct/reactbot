if (process.env.NODE_ENV == "development") {
    module.export = require("./dev");
}
else {
    module.export = require("./prod");
}