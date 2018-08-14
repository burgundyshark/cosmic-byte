import React from 'react'
import Helmet from 'react-helmet'

class TagPageTemplate extends React.Component {
  render() {
    const tag = this.props.pathContext.tag
    const posts = this.props.pathContext.posts
    console.log('tag: ', tag)
    console.log('posts: ', posts)
    return (
      <div>
        {tag && (
          <div>
            <Helmet title={tag.title} />
            <div>
              <p>{tag.title}</p>
              
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TagPageTemplate

// export const pageQuery = graphql`
//   query PageBySlug($slug: String!) {
//     cosmicjsPages(slug: { eq: $slug }) {
//       title
//       content
//     }
//   }
// `

// export const postsQuery = graphql`
//   query AllPosts {
//     allCosmicjsPosts {
//       edges {
//         node {
//           id
//           title
//           slug
//           type_slug
//           status
//           published_at
//           content
//           metafields {
//             object_type
//             value
//             key
//             title
//             type
//             required
//             url
//             imgix_url
//           }
//         }
//       }
//     }
//   }
// `
