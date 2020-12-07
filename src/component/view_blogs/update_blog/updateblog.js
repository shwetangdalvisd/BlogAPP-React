import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { graphql, Query } from "react-apollo";
import { flowRight as compose } from "lodash";

const getBlogsQuery = gql`
  query($id: String) {
    post(id: $id) {
      name
      id
      title
      content
      time
      like
      user_id
    }
  }
`;

const mutateblogupdate = gql`
  mutation($id: String, $title: String, $content: String) {
    updateBlog(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

const Updateblog = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const Titlechange = (e) => setTitle(e.target.value);
  const Contentchange = (e) => setContent(e.target.value);
  console.log(props, "sdsdsdd");
  console.log(props.match.params.id, "id");
  const displayblog = () => {
    const { post } = props.getBlogsQuery;
    if (post) {
      return (
        <form>
          <div className="container">
            <div className="form-group">
              <input type="text" value={title} onChange={Titlechange} />
              <br></br>
              <br></br>
              <textarea
                rows="10"
                cols="50"
                name="content"
                value={content}
                onChange={Contentchange}
              >
                {content}
              </textarea>
              {/* <span className="badge">Posted:{time}</span><div className="pull-right"><span className="badge">{name}</span></div> */}
              <br></br>
              <br></br>
              <button onClick={onSubmitClick}>UPDATE</button>
            </div>
          </div>
        </form>
      );
    } else {
      return <div>Nothing to Return</div>;
    }
  };
  const onSubmitClick = (e) => {
    e.preventDefault();
    let id = props.match.params.id;
    props.mutateblogupdate({
      variables: {
        id: id,
        title: title,
        content: content,
      },
      refetchQueries: [{ query: getBlogsQuery }],
    });
  };
  return <div className="container">{displayblog()}</div>;
};

Updateblog.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.number,
};

export default compose(
  graphql(
    getBlogsQuery,
    { name: "getBlogsQuery" },
    {
      options: (props) => {
        return {
          variables: {
            id: props.match.params.id,
          },
        };
      },
    }
  ),
  graphql(mutateblogupdate, { name: "mutateblogupdate" })
)(Updateblog);
