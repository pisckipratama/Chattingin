const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// database config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://pisckipy:nopassword@reviewapi-a48cn.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
})
.then(() => console.log('successfully connected with mongodb.'))
.catch(err => console.error(err))

app.use('/', indexRouter);
app.use('/api', chatRouter);

const debug = require('debug')('server-chat:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3023');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {

  socket.on('add chat', (chatData = {}) => {
    socket.broadcast.emit('load chat', chatData);
  })

  socket.on('delete chat', id => {
    socket.broadcast.emit('delete chat', id);
  })
})

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}

