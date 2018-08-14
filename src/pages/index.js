import React from 'react'

import PostTeaser from '../components/post-teaser'

const Homepage = ({ data }) => {
  const posts = data.allCosmicjsPosts.edges
  const sortedPosts = posts.sort((a,b) => {
    return new Date(b.node.published_at) - new Date(a.node.published_at)
  }).reverse()
  const headerPosts = sortedPosts.slice(0, 4)
  const bodyPosts = sortedPosts.slice(4)
  return (
    <div className="home-page">
      <div className="header-posts">
        <PostTeaser data={headerPosts[0]} key={0} i={0} />
        <div className="sidesplash">
          { headerPosts.map((post, i) => i !== 0 ? <PostTeaser data={post} key={i} i={i} /> : null) }
        </div>
      </div>
      <div className="body-posts">
        { bodyPosts.map((post, i) => <PostTeaser data={post} key={i} i={i+4} />) }
      </div>
    </div>
  )
}

export default Homepage