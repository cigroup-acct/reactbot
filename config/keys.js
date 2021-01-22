if (process.env.NODE_ENVIRONMENT == "development") {
    module.export = require("./dev");
}
else {
    module.export = require("./prod");
}