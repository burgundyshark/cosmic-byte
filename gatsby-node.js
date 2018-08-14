const _ = require('lodash')
const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve('./src/templates/page.js')
    const postTemplate = path.resolve('./src/templates/post.js')
    const tagPageTemplate = path.resolve('./src/templates/tag-page.js')
    resolve(
      graphql(
        `
          {
            site{
              siteMetadata{
                title
                nav{
                  slug
                  name
                }
              }
            }

            allCosmicjsTags {
              edges {
                node {
                  id
                  title
                  cosmicjsId
                }
              }
            }

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
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const navs = result.data.site.siteMetadata.nav;
        const pages = []
        const posts = result.data.allCosmicjsPosts.edges
          .map(p => p.node)
          .filter(post => post.status === "published");
        const tags = result.data.allCosmicjsTags.edges
          .map(t => t.node)

        posts.map(post => {
          createPage({
            path: `/posts/${post.slug}`,
            component: postTemplate,
            context: {
              post,
              slug: `posts/${post.slug}`
            }
          })
        })

        tags.map(tag => {
          const tagId = `${tag.cosmicjsId}`
          createPage({
            path: `/${tag.id}`,
            component: tagPageTemplate,
            context: {
              tag,
              posts: posts.filter(post => {
                let tagMatch = false
                post.metafields.map(mf => {
                  if(
                    mf.objectType === "tags" &&
                    mf.value === tagId
                  ) tagMatch = true
                })
                return tagMatch
              }),
              slug: `/${tag.id}`
            }
          })
        })


        _.each(navs, (page, index) => {
          const $slug = (page.slug === '/') ? 'home' : page.slug.slice(1);
          if(_.find(pages, function(o) { return o.node.slug === $slug })) {
            createPage({
              path: `${page.slug}`,
              component: pageTemplate,
              context: {
                slug: $slug,
              },
            })
          }
        })
      })
    )
  })
}