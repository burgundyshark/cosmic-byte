import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')

const getMetafield = (data, mfKey) => {
  const mfArr = data.node.metafields
  if (mfKey === "splash_image") console.log('!!',mfArr.find(m => m.key === mfKey))
  switch(mfKey) {
    case "splash_image": return mfArr.find(m => m.key === mfKey).url
    default: return mfArr.find(m => m.key === mfKey).value
  }
}
const getPositionClass = i => {
  console.log('getPosition:', i, ' ', (i > 0 && i < 4))
  if (i === 0) return 'position-splash'
  if (i > 0 && i < 4) return 'position-sidesplash'
  return 'position-default'
}

// Post Teaser Component
const PostTeaser = ({ data, i }) => {
  const author = getMetafield(data, "author")
  const teaserContent = getMetafield(data, "teaser")
  const imgUrl = getMetafield(data, "splash_image")
  const post = data.node
  const publishDate = timeAgo.format(new Date(post.published_at))

  return (
    <div className={`post-teaser ${getPositionClass(i)}`}>
      <div className="teaser-headline">
        <h4>{ post.title }</h4>
        <p className="publish-date">{ publishDate }</p>
        <p className="author">{ author }</p>
      </div>
      <p className="teaser-content">
        { teaserContent }
      </p>
      <div className="teaser-splash">
        <img src={imgUrl} />
      </div>
    </div>
  )
}

export default PostTeaser