import fileSystem from './file-system'

export default  {
  log: (...args) => {
    if (process.env.LOG_DEV === 'TRUE') {
      console.log('log  ', ...args);
    }
    if (process.env.LOG_FILE === 'TRUE') {
      fileSystem.writeLog('devlog', ...args);
    }
  },
  debug: (...args) => {
    if (process.env.LOG_DEBUG === 'TRUE') {
      console.log('debug', ...args);
    }
    if (process.env.LOG_FILE === 'TRUE') {
      fileSystem.writeLog('debug ', ...args);
    }
  }
};