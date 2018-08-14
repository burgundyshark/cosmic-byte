import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Sidebar from '../components/sidebar'
import './index.scss'

// Primary Page Layout
class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarVisible: false
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }
  toggleSidebar() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }
  render() {
    const { children, data } = this.props;
    console.log('data', data)
    console.log('sidebar visible?', this.state.sidebarVisible)
    return (
      <div className="site-wrapper">
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Tech news from all over the cosmos!' },
          ]}
        />
        <Sidebar visible={this.state.sidebarVisible} onExit={this.toggleSidebar} />
        <div id="content">
          { children({ ...this.props }) }
        </div>
        <button id="toggle-sidebar" onClick={this.toggleSidebar}>&#9776;</button>
      </div>
    )
  }
}
// const Layout = (props) => {
//   const { children, data } = props;
//   return (
//     <div className="site-wrapper">
//       <Helmet
//         title={data.site.siteMetadata.title}
//         meta={[
//           { name: 'description', content: 'Tech news from all over the cosmos!' },
//         ]}
//       />
//       <Sidebar />
//       <div id="content">
//         { children({ ...props }) }
//       </div>
//       <button id="toggle-sidebar"/>
//     </div>
//   )
// }

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        nav {
          slug
          name
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
