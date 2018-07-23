'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var ReactTooltip = require('react-tooltip');

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResizableMonthEvent = function (_React$Component) {
  _inherits(ResizableMonthEvent, _React$Component);

  function ResizableMonthEvent() {
    _classCallCheck(this, ResizableMonthEvent);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ResizableMonthEvent.prototype.componentDidMount = function componentDidMount() {
    this.props.connectLeftDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
      captureDraggingState: true
    });
    this.props.connectRightDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
      captureDraggingState: true
    });
  };

  ResizableMonthEvent.prototype.render = function render() {
    var _props = this.props,
        title = _props.title,
        connectLeftDragSource = _props.connectLeftDragSource,
        connectRightDragSource = _props.connectRightDragSource;

    var _map = [connectLeftDragSource, connectRightDragSource].map(function (connectDragSource) {
      return connectDragSource(_react2.default.createElement(
        'div',
        { className: 'rbc-addons-dnd-resize-month-event-anchor' },
        ' '
      ));
    }),
        Left = _map[0],
        Right = _map[1];

        var icoD;
        switch (_props.event.status) {
            case 'not_confirmed':

                var pathDiv2 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M16,2A14,14,0,1,1,2,16,14,14,0,0,1,16,2m0-2A16,16,0,1,0,32,16,16,16,0,0,0,16,0Z" },
                );
                var pathDiv1 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M14.4,21.3c0-2.6,1.3-3.9,3.6-5.9s2.5-2.4,2.5-4.1S19,7.6,16.6,7.6a4.3,4.3,0,0,0-4.2,3.6,4.1,4.1,0,0,0-.1,1H9.6a4.1,4.1,0,0,1,.1-1c.3-3.7,4.2-5.5,7-5.5s6.2,2.4,6.2,5.4-1.8,4-3.3,5.4a5.6,5.6,0,0,0-2.2,4.8Zm3,5.3h-3v-3h3Z" },
                );
                icoD = _react2.default.createElement(
                  'svg',
                  { className: 'svg-month-event', style:{width:'16px', height:'16px', float:'right', 'marginTop':'2px'}, viewBox:"0 0 32 32" },
                  pathDiv1,
                  pathDiv2,
                );
                break;
            case 'first_attempt':

                var pathDiv2 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M24.7,29.4A15.9,15.9,0,0,0,31.9,16c0-4.5-2.1-9.6-7.3-13.6,3.1,3.2,5.3,5.8,5.8,11,.7,7.2-4.8,14.7-14.4,14.7C10.7,28.1,5,25,3.3,16.3,2.9,11,6.2,6.4,6.2,6.4l2.4,4.3L10.7.2.9,3,4.6,4.9c-.1,0-1.1,1.5-1.2,1.5A15,15,0,0,0,.1,15.8h0v.4A15.9,15.9,0,0,0,24.7,29.4" },
                );
                var pathDiv1 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M19.5,25H15.8V10.8l-4.4,1.4v-3L19,6.4h.4Z" },
                );
                icoD = _react2.default.createElement(
                  'svg',
                  { className: 'svg-month-event', style:{width:'16px', height:'16px', float:'right', 'marginTop':'2px'}, viewBox:"0 0 32 32" },
                  pathDiv1,
                  pathDiv2,
                );
            break;
            case 'second_attempt':

                var pathDiv2 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M24.7,29.4A15.9,15.9,0,0,0,31.9,16c0-4.5-2.1-9.6-7.3-13.6,3.1,3.2,5.3,5.8,5.8,11,.7,7.2-4.8,14.7-14.4,14.7C10.7,28.1,5,25,3.3,16.3,2.9,11,6.2,6.4,6.2,6.4l2.4,4.3L10.7.2.9,3,4.6,4.9c-.1,0-1.1,1.5-1.2,1.5A15,15,0,0,0,.1,15.8h0v.4A15.9,15.9,0,0,0,24.7,29.4" },
                );
                var pathDiv1 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M23.6,25H10.9V22.5l6-6.3a14.9,14.9,0,0,0,1.8-2.4,3.5,3.5,0,0,0,.6-1.9,2.9,2.9,0,0,0-.6-1.9,2.1,2.1,0,0,0-1.8-.7,2.4,2.4,0,0,0-1.9.8,3.6,3.6,0,0,0-.8,2.3H10.6a5.5,5.5,0,0,1,.8-3.1,6.6,6.6,0,0,1,2.2-2.2A7.4,7.4,0,0,1,17,6.3a6.6,6.6,0,0,1,4.4,1.4A4.7,4.7,0,0,1,23,11.6a7.7,7.7,0,0,1-.7,2.8,17.8,17.8,0,0,1-2.5,3.3l-4.2,4.4h8Z" },
                );
                icoD = _react2.default.createElement(
                  'svg',
                  { className: 'svg-month-event', style:{width:'16px', height:'16px', float:'right', 'marginTop':'2px'}, viewBox:"0 0 32 32" },
                  pathDiv1,
                  pathDiv2,
                );
                break;
            case 'third_attempt':

                var pathDiv2 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M24.7,29.4A15.9,15.9,0,0,0,31.9,16c0-4.5-2.1-9.6-7.3-13.6,3.1,3.2,5.3,5.8,5.8,11,.7,7.2-4.8,14.7-14.4,14.7C10.7,28.1,5,25,3.3,16.3,2.9,11,6.2,6.4,6.2,6.4l2.4,4.3L10.7.2.9,3,4.6,4.9c-.1,0-1.1,1.5-1.2,1.5A15,15,0,0,0,.1,15.8h0v.4A15.9,15.9,0,0,0,24.7,29.4" },
                );
                var pathDiv1 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M14.9,14.1h2a2.6,2.6,0,0,0,2-.7,2.4,2.4,0,0,0,.6-1.8,2.4,2.4,0,0,0-.6-1.7,2.4,2.4,0,0,0-1.8-.6,2.4,2.4,0,0,0-1.7.6,1.7,1.7,0,0,0-.7,1.5H11.1a4.6,4.6,0,0,1,.7-2.6A6.7,6.7,0,0,1,14,7a7.3,7.3,0,0,1,3-.6,6.9,6.9,0,0,1,4.5,1.4,4.6,4.6,0,0,1,1.6,3.8,3.9,3.9,0,0,1-.7,2.3,5.3,5.3,0,0,1-2,1.6,4.4,4.4,0,0,1,2.3,1.6,4.6,4.6,0,0,1,.7,2.6,5.1,5.1,0,0,1-1.7,3.9A7.1,7.1,0,0,1,17,25a6.3,6.3,0,0,1-4.4-1.4,4.5,4.5,0,0,1-1.8-3.8h3.6a2.1,2.1,0,0,0,.8,1.7,2.9,2.9,0,0,0,1.9.6,3.2,3.2,0,0,0,2-.6,2.4,2.4,0,0,0,.7-1.8q0-2.7-3-2.7H14.9Z" },
                );
                icoD = _react2.default.createElement(
                  'svg',
                  { className: 'svg-month-event', style:{width:'16px', height:'16px', float:'right', 'marginTop':'2px'}, viewBox:"0 0 32 32" },
                  pathDiv1,
                  pathDiv2,
                );
                break;
            case 'confirmed':

                var pathDiv1 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M31.2,11.3A2.6,2.6,0,0,0,28.8,10H21.9c1.4-2.2,3.1-5.9,1.6-8.1l-.2-.3A3,3,0,0,0,21,.3a2.9,2.9,0,0,0-2.2,1l-8,8.7H0V32H23.8c2.6,0,8.1-13.1,8.1-18A4.3,4.3,0,0,0,31.2,11.3ZM6,30H2V12H6Zm17.6,0H8V12h3.6l8.7-9.4a.7.7,0,0,1,.6-.3,1.2,1.2,0,0,1,.8.4l.2.3c.9,1.4-1,5.2-2.7,7.4L18.1,12H28.8a.9.9,0,0,1,1,.8C30.9,16.8,25.2,28.6,23.6,30Z" },
                );
                icoD = _react2.default.createElement(
                  'svg',
                  { className: 'svg-month-event', style:{width:'16px', height:'16px', float:'right', 'marginTop':'2px'}, viewBox:"0 0 32 32" },
                  pathDiv1,
                );
                break;
            case 'waiting_room':

                var pathDiv2 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M16,.2A15.8,15.8,0,0,0,.2,15.9,16,16,0,0,0,15.9,31.8,15.8,15.8,0,1,0,16,.2Zm0,29.3A13.5,13.5,0,1,1,29.5,16,13.4,13.4,0,0,1,16,29.5Z" },
                );
                var pathDiv1 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M15.6,17.7s1-12-.5-12a64.1,64.1,0,0,0-1.4,11.9,2.2,2.2,0,0,0,.6,1.5c1.8,1.9,4.2,4,5.8,5.6C21.8,22.8,15.6,17.7,15.6,17.7Z" },
                );
                icoD = _react2.default.createElement(
                  'svg',
                  { className: 'svg-month-event', style:{width:'16px', height:'16px', float:'right', 'marginTop':'2px'}, viewBox:"0 0 32 32" },
                  pathDiv1,
                  pathDiv2,
                );
                break;
            case 'attended':

                var pathDiv1 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M16.1.3A15.8,15.8,0,0,0,.4,16,15.8,15.8,0,0,0,16.1,31.7,15.8,15.8,0,0,0,31.8,16,15.8,15.8,0,0,0,16.1.3Zm-5,24-5.5-8,3.5-2.4,3,4.5L23.6,9.9l2.5,3.4Z" },
                );
                icoD = _react2.default.createElement(
                  'svg',
                  { className: 'svg-month-event', style:{width:'16px', height:'16px', float:'right', 'marginTop':'2px'}, viewBox:"0 0 32 32" },
                  pathDiv1,
                );
                break;
            case 'unjustified_missing':
                var pathDiv2 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M14.1,24.4a1.8,1.8,0,0,1,1.8-1.8,1.7,1.7,0,0,1,1.8,1.8,1.8,1.8,0,1,1-3.6,0Zm.8-4.3L13.4,5.7h5.1L16.9,20.1Z" },
                );
                var pathDiv1 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M15.9,2a14,14,0,1,1-14,14,14,14,0,0,1,14-14m0-2a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z" },
                );
                icoD = _react2.default.createElement(
                  'svg',
                  { className: 'svg-month-event', style:{width:'16px', height:'16px', float:'right', 'marginTop':'2px'}, viewBox:"0 0 32 32" },
                  pathDiv1,
                  pathDiv2,
                );
                break;
            case 'justified_missing':
                var pathDiv2 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M16,2A14,14,0,1,1,2,16,14,14,0,0,1,16,2m0-2A16,16,0,1,0,32,16,16,16,0,0,0,16,0Z" },
                );
                var pathDiv1 = _react2.default.createElement(
                  'path',
                  { className: 'path-month-event', d:"M14.3,15.8,7.4,7.4H9.8a1.9,1.9,0,0,1,1.7.7L16,13.9l4.5-5.8a1.8,1.8,0,0,1,1.7-.7h2.3l-6.8,8.4,7.2,8.8H22.5a2.3,2.3,0,0,1-1.7-.4l-4.9-5.9-4.7,5.9c-.4.6-1.1.4-1.7.4H7.1Z" },
                );
                icoD = _react2.default.createElement(
                  'svg',
                  { className: 'svg-month-event', style:{width:'16px', height:'16px', float:'right', 'marginTop':'2px'}, viewBox:"0 0 32 32" },
                  pathDiv1,
                  pathDiv2,
                );
                break;
        };

    return _react2.default.createElement(
      'div',
      { style:{ display: 'flex',justifyContent:'space-between', flexWrap: 'nowrap' } ,'data-tip': "<div>"+_props.event.start.getHours()+":"+_props.event.start.getMinutes()+" - "+_props.event.end.getHours()+":"+_props.event.end.getMinutes()+"</div>"
        +"<div>"+(_props.event.title)+"</div>"
        +"<div> Paciente: "+(_props.event.patient)+"</div>"
        +"<div> Dentista: "+(_props.event.user)+"</div>", 'data-for': _props.event._id , className: 'rbc-addons-dnd-resizable-month-event' },
      Left,
      _react2.default.createElement(
        'div',
        {style: {display: 'flex',position: 'relative', width: '80%', overflow: 'hidden'},className: 'div-flex'},
        _react2.default.createElement(
          'div',
          {className: 'div-patient'},
          (_props.event.patient),
        ),
      ),
      icoD,
      _react2.default.createElement(
        ReactTooltip,
        { 'id': _props.event._id, place:'left', effect:'solid', html:true, multiline: true }
      ),
      Right,
    );
  };

  return ResizableMonthEvent;
}(_react2.default.Component);

var eventSourceLeft = {
  beginDrag: function beginDrag(_ref) {
    var event = _ref.event;
    return _extends({}, event, { type: 'resizeLeft' });
  }
};

var eventSourceRight = {
  beginDrag: function beginDrag(_ref2) {
    var event = _ref2.event;
    return _extends({}, event, { type: 'resizeRight' });
  }
};

ResizableMonthEvent.propTypes = {
  connectLeftDragPreview: _propTypes2.default.func,
  connectLeftDragSource: _propTypes2.default.func,
  connectRightDragPreview: _propTypes2.default.func,
  connectRightDragSource: _propTypes2.default.func,
  title: _propTypes2.default.string
};

exports.default = (0, _compose2.default)((0, _reactDnd.DragSource)('resize', eventSourceLeft, function (connect) {
  return {
    connectLeftDragSource: connect.dragSource(),
    connectLeftDragPreview: connect.dragPreview()
  };
}), (0, _reactDnd.DragSource)('resize', eventSourceRight, function (connect) {
  return {
    connectRightDragSource: connect.dragSource(),
    connectRightDragPreview: connect.dragPreview()
  };
}))(ResizableMonthEvent);
module.exports = exports['default'];