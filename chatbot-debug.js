var _ = require('underscore');
var clc = require('cli-color');
var ChatContext = require('./lib/chat-context.js');

var green = clc.greenBright;
var white = clc.white;
var grey = clc.blackBright;

module.exports = function(RED) {

  function ChatBotDebug(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    this.chatId = config.chatId;

    this.on('input', function(msg) {

      var context = node.context();
      var transport = msg.originalMessage != null && msg.originalMessage.transport != null ? msg.originalMessage.transport : null;

      var chatId = msg.payload.chatId || (originalMessage && originalMessage.chat.id);
      var chatContext = context.flow.get('chat:' + chatId) || ChatContext(chatId);

      // format a little
      console.log('');
      console.log(grey('------ ChatBot debug ----------------'));
      console.log(green('Transport:'), white(transport));
      console.log(green('ChatId:'), white(chatId));
      console.log(grey('------ ChatBot context --------------'));
      _(chatContext.all()).each(function(value, key) {
        console.log(green(key + ':'), white(value));
      });
      console.log('');

      // show on debug panel
      node.warn({
        transport: transport,
        chatId: chatId
      });
      node.warn(chatContext.all());
    });

  }

  RED.nodes.registerType('chatbot-debug', ChatBotDebug);
};
