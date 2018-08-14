import React from 'react'
import Helmet from 'react-helmet'

class PageTemplate extends React.Component {
  render() {
    const page = this.props.data.cosmicjsPages
    return (
      <div>
        {page && (
          <div>
            <Helmet title={page.title} />
            <h1>{page.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        )}
      </div>
    )
  }
}

export default PageTemplate

// export const pageQuery = graphql`
//   query PageBySlug($slug: String!) {
//     cosmicjsPages(slug: { eq: $slug }) {
//       title
//       content
//     }
//   }
// `

export const postsQuery = graphql`
  query AllPosts {
    allCosmicjsPosts {
      edges {
        node {
          id
          title
          slug
          type_slug
          status
          published_at
          content
          metafields {
            object_type
            value
            key
            title
            type
            required
            url
            imgix_url
          }
        }
      }
    }
  }
`
