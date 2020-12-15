import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { gql, useQuery, useMutation } from "@apollo/client";


export const getBlogsQuery = gql`
  query($id: String) {
    post(id: $id) {
      name
      id
      title
      content
      like
      user_id
    }
  }
`;

export const mutateblogupdate = gql`
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
  const [M_BLOGS_update] = useMutation(mutateblogupdate);
  const { loading, data } = useQuery(getBlogsQuery, {
    variables: { id: props.match.params.id },
  });
  
  useEffect(()=>{
    console.log(data,"use")
    if(data){
    setTitle(data.post.title);
    setContent(data.post.content)
    }
  },[data])
  const displayblog = () => {
    if (loading) return <p>Loading ...</p>;
    if (data) {
      console.log(data,"data");

      return (
        <form>
          <div>
              <div className="form-group">
                <input type="text" data-testid='title' aria-label="title" value={title} onChange={Titlechange} />
                <br></br>
                <br></br>
                <textarea
                  rows="10"
                  cols="50"
                  name="content"
                  aria-label="content"
                  data-testid='content'
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
    M_BLOGS_update({
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
  id: PropTypes.string,
};

export default Updateblog;
