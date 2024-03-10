"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("dotenv/config");
var _models = require("./models");
var _api = require("./api");
var _config2 = _interopRequireDefault(require("./config"));
var _app = _interopRequireDefault(require("./app"));
require("./errors");
var _scheduler = _interopRequireDefault(require("./scheduler"));
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _cronjob = _interopRequireDefault(require("./cronjob"));
// import kue from './kue';

global.appRoot = _path["default"].resolve(__dirname);
var PORT = _config2["default"].app.port;
var app = _app["default"].setup(_config2["default"]);

/*cors handling*/
app.use((0, _cors["default"])({
  origin: true,
  credentials: true
}));
app.options('*', (0, _cors["default"])());

/* Route handling */
app.use('/api', _api.restRouter);
// app.use('/', webRouter);

app.use(function (error, req, res, next) {
  if (!(error instanceof RequestError)) {
    error = new RequestError('Some Error Occurred', 500, error.message);
  }
  error.status = error.status || 500;
  res.status(error.status);
  var contype = req.headers['content-type'];
  var json = !(!contype || contype.indexOf('application/json') !== 0);
  if (json) {
    return res.json({
      errors: error.errorList
    });
  } else {
    res.render(error.status.toString(), {
      layout: null
    });
  }
});

// kue.init();
/* Database Connection */
_models.db.sequelize.authenticate().then(function () {
  console.log('Nice! Database looks fine');
  _scheduler["default"].init();
})["catch"](function (err) {
  console.log(err, "Something went wrong with the Database Update!");
});
_cronjob["default"].start();

/* Start Listening service */
app.listen(PORT, function () {
  console.log("Server is running at PORT http://localhost:".concat(PORT));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiX21vZGVscyIsIl9hcGkiLCJfY29uZmlnMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfYXBwIiwiX3NjaGVkdWxlciIsIl9wYXRoIiwiX2NvcnMiLCJfY3JvbmpvYiIsImdsb2JhbCIsImFwcFJvb3QiLCJwYXRoIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsIlBPUlQiLCJjb25maWciLCJhcHAiLCJwb3J0IiwiYXBwTWFuYWdlciIsInNldHVwIiwidXNlIiwiY29ycyIsIm9yaWdpbiIsImNyZWRlbnRpYWxzIiwib3B0aW9ucyIsInJlc3RSb3V0ZXIiLCJlcnJvciIsInJlcSIsInJlcyIsIm5leHQiLCJSZXF1ZXN0RXJyb3IiLCJtZXNzYWdlIiwic3RhdHVzIiwiY29udHlwZSIsImhlYWRlcnMiLCJqc29uIiwiaW5kZXhPZiIsImVycm9ycyIsImVycm9yTGlzdCIsInJlbmRlciIsInRvU3RyaW5nIiwibGF5b3V0IiwiZGIiLCJzZXF1ZWxpemUiLCJhdXRoZW50aWNhdGUiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInNjaGVkdWxlciIsImluaXQiLCJlcnIiLCJjaGVja0V4cGlyZWRWb3VjaGVycyIsInN0YXJ0IiwibGlzdGVuIiwiY29uY2F0Il0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnZG90ZW52L2NvbmZpZyc7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyByZXN0Um91dGVyIH0gZnJvbSAnLi9hcGknO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcclxuaW1wb3J0IGFwcE1hbmFnZXIgZnJvbSAnLi9hcHAnO1xyXG4vLyBpbXBvcnQga3VlIGZyb20gJy4va3VlJztcclxuaW1wb3J0ICcuL2Vycm9ycyc7XHJcbmltcG9ydCBzY2hlZHVsZXIgZnJvbSAnLi9zY2hlZHVsZXInO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XHJcbmltcG9ydCBjaGVja0V4cGlyZWRWb3VjaGVycyBmcm9tICcuL2Nyb25qb2InO1xyXG5nbG9iYWwuYXBwUm9vdCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUpO1xyXG5cclxuY29uc3QgUE9SVCA9IGNvbmZpZy5hcHAucG9ydDtcclxuY29uc3QgYXBwID0gYXBwTWFuYWdlci5zZXR1cChjb25maWcpO1xyXG5cclxuLypjb3JzIGhhbmRsaW5nKi9cclxuYXBwLnVzZShjb3JzKHtcclxuXHRvcmlnaW46dHJ1ZSxcclxuICAgIGNyZWRlbnRpYWxzOnRydWVcclxufSkpO1xyXG5hcHAub3B0aW9ucygnKicsIGNvcnMoKSk7XHJcblxyXG4vKiBSb3V0ZSBoYW5kbGluZyAqL1xyXG5hcHAudXNlKCcvYXBpJywgcmVzdFJvdXRlcik7XHJcbi8vIGFwcC51c2UoJy8nLCB3ZWJSb3V0ZXIpO1xyXG5cclxuYXBwLnVzZSgoZXJyb3IsIHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0aWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBSZXF1ZXN0RXJyb3IpKSB7XHJcblx0XHRlcnJvciA9IG5ldyBSZXF1ZXN0RXJyb3IoJ1NvbWUgRXJyb3IgT2NjdXJyZWQnLCA1MDAsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cdFx0ZXJyb3Iuc3RhdHVzID0gZXJyb3Iuc3RhdHVzIHx8IDUwMDtcclxuXHRyZXMuc3RhdHVzKGVycm9yLnN0YXR1cyk7XHJcblx0bGV0IGNvbnR5cGUgPSByZXEuaGVhZGVyc1snY29udGVudC10eXBlJ107XHJcblx0dmFyIGpzb24gPSAhKCFjb250eXBlIHx8IGNvbnR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpICE9PSAwKTtcclxuXHRpZiAoanNvbikge1xyXG5cdFx0cmV0dXJuIHJlcy5qc29uKHsgZXJyb3JzOiBlcnJvci5lcnJvckxpc3QgfSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlcy5yZW5kZXIoZXJyb3Iuc3RhdHVzLnRvU3RyaW5nKCksIHtsYXlvdXQ6IG51bGx9KVxyXG5cdH1cclxufSk7XHJcblxyXG4vLyBrdWUuaW5pdCgpO1xyXG4vKiBEYXRhYmFzZSBDb25uZWN0aW9uICovXHJcbmRiLnNlcXVlbGl6ZS5hdXRoZW50aWNhdGUoKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHRjb25zb2xlLmxvZygnTmljZSEgRGF0YWJhc2UgbG9va3MgZmluZScpO1xyXG5cdHNjaGVkdWxlci5pbml0KCk7XHJcbn0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuXHRjb25zb2xlLmxvZyhlcnIsIFwiU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGUgRGF0YWJhc2UgVXBkYXRlIVwiKVxyXG59KTtcclxuXHJcbmNoZWNrRXhwaXJlZFZvdWNoZXJzLnN0YXJ0KClcclxuXHJcbi8qIFN0YXJ0IExpc3RlbmluZyBzZXJ2aWNlICovXHJcbmFwcC5saXN0ZW4oUE9SVCwgKCkgPT4ge1xyXG5cdGNvbnNvbGUubG9nKGBTZXJ2ZXIgaXMgcnVubmluZyBhdCBQT1JUIGh0dHA6Ly9sb2NhbGhvc3Q6JHtQT1JUfWApO1xyXG59KTsiXSwibWFwcGluZ3MiOiI7OztBQUFBQSxPQUFBO0FBQ0EsSUFBQUMsT0FBQSxHQUFBRCxPQUFBO0FBQ0EsSUFBQUUsSUFBQSxHQUFBRixPQUFBO0FBQ0EsSUFBQUcsUUFBQSxHQUFBQyxzQkFBQSxDQUFBSixPQUFBO0FBQ0EsSUFBQUssSUFBQSxHQUFBRCxzQkFBQSxDQUFBSixPQUFBO0FBRUFBLE9BQUE7QUFDQSxJQUFBTSxVQUFBLEdBQUFGLHNCQUFBLENBQUFKLE9BQUE7QUFDQSxJQUFBTyxLQUFBLEdBQUFILHNCQUFBLENBQUFKLE9BQUE7QUFDQSxJQUFBUSxLQUFBLEdBQUFKLHNCQUFBLENBQUFKLE9BQUE7QUFDQSxJQUFBUyxRQUFBLEdBQUFMLHNCQUFBLENBQUFKLE9BQUE7QUFMQTs7QUFNQVUsTUFBTSxDQUFDQyxPQUFPLEdBQUdDLGdCQUFJLENBQUNDLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDO0FBRXhDLElBQU1DLElBQUksR0FBR0MsbUJBQU0sQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJO0FBQzVCLElBQU1ELEdBQUcsR0FBR0UsZUFBVSxDQUFDQyxLQUFLLENBQUNKLG1CQUFNLENBQUM7O0FBRXBDO0FBQ0FDLEdBQUcsQ0FBQ0ksR0FBRyxDQUFDLElBQUFDLGdCQUFJLEVBQUM7RUFDWkMsTUFBTSxFQUFDLElBQUk7RUFDUkMsV0FBVyxFQUFDO0FBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBQ0hQLEdBQUcsQ0FBQ1EsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFBSCxnQkFBSSxFQUFDLENBQUMsQ0FBQzs7QUFFeEI7QUFDQUwsR0FBRyxDQUFDSSxHQUFHLENBQUMsTUFBTSxFQUFFSyxlQUFVLENBQUM7QUFDM0I7O0FBRUFULEdBQUcsQ0FBQ0ksR0FBRyxDQUFDLFVBQUNNLEtBQUssRUFBRUMsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBSztFQUNsQyxJQUFJLEVBQUVILEtBQUssWUFBWUksWUFBWSxDQUFDLEVBQUU7SUFDckNKLEtBQUssR0FBRyxJQUFJSSxZQUFZLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFSixLQUFLLENBQUNLLE9BQU8sQ0FBQztFQUNqRTtFQUNGTCxLQUFLLENBQUNNLE1BQU0sR0FBR04sS0FBSyxDQUFDTSxNQUFNLElBQUksR0FBRztFQUNuQ0osR0FBRyxDQUFDSSxNQUFNLENBQUNOLEtBQUssQ0FBQ00sTUFBTSxDQUFDO0VBQ3hCLElBQUlDLE9BQU8sR0FBR04sR0FBRyxDQUFDTyxPQUFPLENBQUMsY0FBYyxDQUFDO0VBQ3pDLElBQUlDLElBQUksR0FBRyxFQUFFLENBQUNGLE9BQU8sSUFBSUEsT0FBTyxDQUFDRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDbkUsSUFBSUQsSUFBSSxFQUFFO0lBQ1QsT0FBT1AsR0FBRyxDQUFDTyxJQUFJLENBQUM7TUFBRUUsTUFBTSxFQUFFWCxLQUFLLENBQUNZO0lBQVUsQ0FBQyxDQUFDO0VBQzdDLENBQUMsTUFBTTtJQUNOVixHQUFHLENBQUNXLE1BQU0sQ0FBQ2IsS0FBSyxDQUFDTSxNQUFNLENBQUNRLFFBQVEsQ0FBQyxDQUFDLEVBQUU7TUFBQ0MsTUFBTSxFQUFFO0lBQUksQ0FBQyxDQUFDO0VBQ3BEO0FBQ0QsQ0FBQyxDQUFDOztBQUVGO0FBQ0E7QUFDQUMsVUFBRSxDQUFDQyxTQUFTLENBQUNDLFlBQVksQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxZQUFZO0VBQzVDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztFQUN4Q0MscUJBQVMsQ0FBQ0MsSUFBSSxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFDLFNBQU0sQ0FBQyxVQUFVQyxHQUFHLEVBQUU7RUFDdkJKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRyxHQUFHLEVBQUUsZ0RBQWdELENBQUM7QUFDbkUsQ0FBQyxDQUFDO0FBRUZDLG1CQUFvQixDQUFDQyxLQUFLLENBQUMsQ0FBQzs7QUFFNUI7QUFDQXBDLEdBQUcsQ0FBQ3FDLE1BQU0sQ0FBQ3ZDLElBQUksRUFBRSxZQUFNO0VBQ3RCZ0MsT0FBTyxDQUFDQyxHQUFHLCtDQUFBTyxNQUFBLENBQStDeEMsSUFBSSxDQUFFLENBQUM7QUFDbEUsQ0FBQyxDQUFDIn0=