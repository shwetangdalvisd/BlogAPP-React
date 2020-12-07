"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _apolloBoost = require("apollo-boost");

var _reactApollo = require("react-apollo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query($id:String){\n    post(id:$id) {\n      name\n      id\n      title\n      content\n      time\n      like\n      user_id\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getBlogsQuery = (0, _apolloBoost.gql)(_templateObject());

var Singleblog = function Singleblog(props) {
  // const [post, setPost] = useState([]);
  // const id = match.params.id;
  console.log(props, "p"); // const displayblog = ()=>{
  //   const {post} = props.data;
  //   if (post){
  //     return(
  //       <div key={post.id} className="container">
  //           <div className="col-md-16">
  //             <h1 data-testid='title'>{post.title}</h1>
  //             <p>{post.content}</p>
  //             <span className="badge">Posted:{post.time}</span>
  //             <div className="pull-right">
  //               <span className="badge">{post.name}</span>
  //             </div>
  //           </div>
  //       </div>
  //     )
  //   }else{
  //     return(
  //       <div>Nothing to Return</div>
  //     )
  //   }
  // }
  //       return (
  //         <div className="container">
  //           {displayblog()}
  //         </div>
  // );
};

Singleblog.propTypes = {
  match: _propTypes["default"].object,
  params: _propTypes["default"].object,
  id: _propTypes["default"].string
};

var _default = (0, _reactApollo.graphql)(getBlogsQuery, {
  options: function options(props) {
    return {
      variables: {
        id: props.match.params.id
      }
    };
  }
})(Singleblog);

exports["default"] = _default;