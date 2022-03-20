// @ts-nocheck

/**
 * First we check whether the first Element is an A we exclude other categories because tags don't include the
 * category type (ABC, BC, ...).
 * Next we asign a priority depending on the length of the categorytype.
 *
 * If tags isn't undefined the filter function has to check whether the tag in the categoryTagsAndPrios
 * object is in the tags.
 *
 * Before we return the resulting arrayobject we filter out the undefined priorities in order to avoid
 * queries to shopify like "( OR  OR  OR  OR )"
 */
const getCategoryTagsAndPriorities = (data: any, tags?: Array<string>) => {
  let max = 0

  let categoryTagsAndPrios = data?.allShopifyCollection.edges.map(edge => {
    const firstElement = edge.node.title.split(':')[0]
    const prio = firstElement[0] === 'A' ? firstElement.length : undefined
    if (typeof prio !== 'undefined' && prio > max) {
      max = prio
    }
    return {
      priority: prio,
      tag: data?.meta.tags.filter((tag: string) =>
        tag.endsWith(edge.node.title.split(':').at(-1))
      )
    }
  })

  if (tags) {
    return {
      maxPrio: max,
      data: categoryTagsAndPrios.filter(
        (tagAndPrio: any) =>
          (tagAndPrio.tag[0] ? tags.includes(tagAndPrio.tag[0]) : false) &&
          typeof tagAndPrio.priority !== 'undefined'
      )
    }
  }

  return {
    maxPrio: max,
    data: categoryTagsAndPrios.filter(
      (tagAndPrio: any) => typeof tagAndPrio.priority !== 'undefined'
    )
  }
}

const splitAndCheckHandle = (handle: string) => {
  const splitHandle = handle.split('-')

  if (!isNaN(splitHandle.at(-1))) {
    splitHandle.pop(-1)
  }
  return splitHandle
}

const getSubcollectionType = (splitHandle: Array<string>) => {
  let subcollectionType
  const len = splitHandle[0].length + 1

  /**
   * If true we have a handle that looks like a-waffen or ab-weapons-shotguns (this will be used as an example throughout)
   * So we first decide the subcollectionType which looks like this: abc
   *
   * Then we build it into a full identifier by excluding other abc categories that are not related
   * by adding -weapons-shotguns-
   *
   * Else if the handle looks like or b-shotguns or bc-shotguns-pumpguns
   * We return an a-.
   */
  if (len > 1 && splitHandle[0][0] === 'a') {
    subcollectionType =
      splitHandle[0] +
      String.fromCharCode(
        splitHandle[0].charCodeAt(splitHandle[0].length - 1) + 1
      )
    for (let i = 1; i < splitHandle[0].length + 1; i++) {
      subcollectionType = subcollectionType + '-' + splitHandle[i]
    }
    subcollectionType = subcollectionType + '-'
  } else if (len > 1 && splitHandle[0][0] === 'b') {
    subcollectionType = 'a-'
  } else {
    console.error('Error: Handle too short or starts with invalid type.')
    return ''
  }

  return subcollectionType
}

const getTotalProducts = (subtitle: string, products: any) => {
  const subcategoryProducts = products.filter(product =>
    product.tags.includes(
      `Kategorie:${subtitle.slice(subtitle.lastIndexOf(':') + 1)}`
    )
  )

  return subcategoryProducts.length
}

const getUnfilteredRelatedProducts = (
  data: any,
  handle: string,
  splitHandle: Array<string>
) => {
  const relatedCategories = data?.allShopifyCollection.edges.filter(edge => {
    if (splitHandle[0].length === 2 && splitHandle[0][0] === 'b') {
      return (
        edge.node.handle.includes(
          splitHandle.slice(1, -1).toString().replaceAll(',', '-')
        ) && edge.node.handle.split('-').length === splitHandle.length
      )
    } else if (splitHandle[0].length > 1) {
      return edge.node.handle.endsWith(
        splitHandle.slice(2).toString().replaceAll(',', '-')
      )
    } else if (splitHandle[0].length === 1 && splitHandle[0][0] === 'a') {
      return edge.node.handle === handle
    } else if (splitHandle[0].length === 1 && splitHandle[0][0] === 'b') {
      return edge.node.handle.endsWith(splitHandle.slice(1).join('-'))
    }
  })

  return [].concat.apply(
    [],
    relatedCategories.map(category => category.node.products)
  )
}

const getFilteredProducts = (unfilteredRelatedProducts, handle, product?) => {
  const filteredRelatedProducts: Array<any> = []

  //change this to change the amount of displayed RelatedProducts
  const iterationLimit =
    unfilteredRelatedProducts.length > 12
      ? 12
      : unfilteredRelatedProducts.length

  for (let i = 0; i < iterationLimit; i++) {
    const randomIndex = Math.floor(
      Math.random() * unfilteredRelatedProducts.length
    )

    if (product) {
      if (product.handle !== unfilteredRelatedProducts[randomIndex].handle) {
        if (
          filteredRelatedProducts.filter(
            (val: any) =>
              val.handle === unfilteredRelatedProducts[randomIndex].handle
          ).length === 0
        ) {
          filteredRelatedProducts.push(unfilteredRelatedProducts[randomIndex])
        }
      }
    } else {
      if (
        filteredRelatedProducts.filter(
          (val: any) =>
            val.handle === unfilteredRelatedProducts[randomIndex].handle
        ).length === 0
      ) {
        filteredRelatedProducts.push(unfilteredRelatedProducts[randomIndex])
      }
    }
    unfilteredRelatedProducts.splice(randomIndex, 1)

    if (
      filteredRelatedProducts.size < iterationLimit &&
      unfilteredRelatedProducts.length > 0 &&
      i + 1 === iterationLimit
    ) {
      i -= 1
    }
  }

  return Array.from(filteredRelatedProducts.values())
}

const createAllProductsShopPage = (data, actions) => {
  const products = []
  const collections = {}
  data?.allShopifyProduct.edges.map(edge => {
    products.push(edge.node)
    const keys = Object.keys(edge.node.collections)
    const handles = []
    for (const key of keys) {
      handles.push(edge.node.collections[key].handle)
    }
    collections[edge.node.id] = handles
  })

  const categoryTagsAndPriorities = getCategoryTagsAndPriorities(data)

  actions.createPage({
    path: '/products/',
    component: require.resolve('../templatePages/ShopPage/index.tsx'),
    context: {
      skipJaenPage: true,
      header: {title: 'Alle Produkte'},
      products: {items: products.slice(0, 12)},
      filter: {
        categoryTagsAndPriorities: categoryTagsAndPriorities,
        allTags: data?.meta.tags,
        productPageTags: data?.meta.tags,
        activeTags: [],
        initialFilters: {
          tags: [],
          maxPrice: Math.max(
            ...products.map(
              product =>
                product.contextualPricing.maxVariantPricing.price.amount
            )
          )
        },
        hasNextPage: products.length > 12
      }
    }
  })

  products.forEach(product => {
    let unfilteredRelatedProducts = []
    for (const handle of collections[product.id]) {
      unfilteredRelatedProducts = unfilteredRelatedProducts.concat(
        getUnfilteredRelatedProducts(data, handle, splitAndCheckHandle(handle))
      )
    }

    const filteredRelatedProducts = getFilteredProducts(
      unfilteredRelatedProducts,
      '',
      product
    )

    actions.createPage({
      path: `/products/${product.handle}/`,
      component: require.resolve('../templatePages/ProductPage/index.tsx'),
      context: {
        skipJaenPage: true,
        header: {title: product.title},
        handle: product.handle,
        imageSlider: {
          featuredImage: {
            alt: product.featuredImage.alt || product.title,
            gatsbyImageData: product.featuredImage.gatsbyImageData
          },
          images: product.images
            .filter(image => image.shopifyId !== product.featuredImage.id)
            .map(image => ({
              alt: image.alt || product.title,
              gatsbyImageData: image.gatsbyImageData
            }))
        },
        productDetail: {
          id: product.id,
          price: product.contextualPricing.maxVariantPricing.price.amount,
          discountPrice:
            product.contextualPricing.maxVariantPricing.compareAtPrice?.amount,
          tags: product.tags
        },
        productMoreDetail: {
          description: product.descriptionHtml
        },
        featuredProducts: filteredRelatedProducts
      }
    })
  })
}

const createCollectionShopAndProductPages = (data, actions) => {
  data?.allShopifyCollection.edges.forEach(edge => {
    const splitHandle = splitAndCheckHandle(edge.node.handle)
    const subcollectionType = getSubcollectionType(splitHandle)

    let slug =
      '/' +
      edge.node.title
        .split(':')
        .slice(1)
        .join('/')
        .toLowerCase()
        .replaceAll(' ', '-')

    const subcategories = data?.allShopifyCollection.edges.filter(edge2 => {
      return (
        edge2.node.handle.startsWith(subcollectionType) ||
        edge.node.handle === edge2.node.handle
      )
    })

    const items = subcategories
      .map(subcategory => {
        const totalProducts = getTotalProducts(
          subcategory.node.title,
          edge.node.products
        )
        return {
          title:
            subcategory.node.title === edge.node.title
              ? 'Alle Produkte'
              : subcategory.node.title.split(':').at(-1),
          handle:
            subcategory.node.handle === edge.node.handle
              ? 'alle-produkte'
              : subcategory.node.handle,
          totalProducts: totalProducts,
          image: subcategory.node.image ? subcategory.node.image : undefined
        }
      })
      .sort((a, b) =>
        a.title.slice(a.title.lastIndexOf(':') + 1) >
          b.title.slice(b.title.lastIndexOf(':') + 1) ||
        b.title === 'Alle Produkte'
          ? 1
          : -1
      )

    if (edge.node.products.length > 0) {
      actions.createPage({
        path: slug,
        component: require.resolve(`../templatePages/CategoryPage/index.tsx`),
        context: {
          skipJaenPage: true,
          category: {
            handle: edge.node.handle,
            title: edge.node.title.split(':').at(-1),
            items: items
          },
          productGrid: {
            title: 'Empfohlende Artikel',
            items: edge.node.products.slice(0, 8)
          }
        }
      })
    }

    const activeTags = data?.meta.tags.filter(tag => {
      const splitTitle = edge.node.title.split(':')
      splitTitle.shift()
      let rval = false
      for (let i = 0; i >= -splitTitle.length; i--) {
        if (tag.endsWith(splitTitle.at(i))) {
          rval = true
        }
      }
      return rval
    })

    const productPageTags = new Set<string>()
    edge.node.products.forEach(product => {
      product.tags.forEach(tag => {
        productPageTags.add(tag)
      })
    })

    const productPageTagsArray = Array.from(productPageTags).filter(
      tag => !activeTags.includes(tag)
    )

    const categoryTagsAndPriorities = getCategoryTagsAndPriorities(
      data,
      productPageTagsArray
    )

    const oldSlug = slug
    slug = slug + '/products/'
    actions.createPage({
      path: slug,
      component: require.resolve('../templatePages/ShopPage/index.tsx'),
      context: {
        skipJaenPage: true,
        header: {title: edge.node.title.split(':').at(-1)},
        products: {
          items: edge.node.products
            .sort((a, b) => (a.title > b.title ? 1 : -1))
            .slice(0, 12)
        },
        filter: {
          categoryTagsAndPriorities: categoryTagsAndPriorities,
          allTags: data?.meta.tags,
          productPageTags: productPageTagsArray,
          activeTags: activeTags,
          initialFilters: {
            tags: [],
            maxPrice: Math.max(
              ...edge.node.products.map(
                product =>
                  product.contextualPricing.maxVariantPricing.price.amount
              )
            )
          },
          hasNextPage: edge.node.products.length > 12
        }
      }
    })

    if (items.length <= 1 && edge.node.products.length > 0) {
      actions.createRedirect({
        fromPath: oldSlug,
        toPath: slug,
        redirectInBrowser: true,
        isPermanent: true
      })
    }

    edge.node.products.forEach(product => {
      const unfilteredRelatedProducts = getUnfilteredRelatedProducts(
        data,
        edge.node.handle,
        splitHandle
      )
      const filteredRelatedProducts = getFilteredProducts(
        unfilteredRelatedProducts,
        edge.node.handle,
        product
      )

      actions.createPage({
        path: `${slug}${product.handle}/`,
        component: require.resolve('../templatePages/ProductPage/index.tsx'),
        context: {
          skipJaenPage: true,
          handle: product.handle,
          header: {title: product.title},
          imageSlider: {
            featuredImage: {
              alt: product.featuredImage.alt || product.title,
              gatsbyImageData: product.featuredImage.gatsbyImageData
            },
            images: product.images
              .filter(image => image.shopifyId !== product.featuredImage.id)
              .map(image => ({
                alt: image.alt || product.title,
                gatsbyImageData: image.gatsbyImageData
              }))
          },
          productDetail: {
            id: product.id,
            price: product.contextualPricing.maxVariantPricing.price.amount,
            tags: product.tags
          },
          productMoreDetail: {
            description: product.descriptionHtml
          },
          featuredProducts: filteredRelatedProducts
        }
      })
    })
  })
}

export const createPages = async (actions, graphql) => {
  const {data} = await graphql(`
    query {
      meta: allShopifyProduct {
        tags: distinct(field: tags)
      }
      allShopifyCollection {
        edges {
          node {
            title
            handle
            image {
              gatsbyImageData
            }
            products {
              id
              handle
              createdAt
              descriptionHtml
              title
              tags
              status
              totalInventory
              contextualPricing {
                maxVariantPricing {
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                }
              }
              images {
                shopifyId
                gatsbyImageData
              }
              featuredImage {
                id
                gatsbyImageData
              }
            }
          }
        }
      }
      allShopifyProduct(sort: {fields: title, order: ASC}) {
        edges {
          node {
            id
            handle
            collections {
              handle
            }
            descriptionHtml
            title
            tags
            status
            totalInventory
            createdAt
            contextualPricing {
              maxVariantPricing {
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
              }
            }
            images {
              shopifyId
              gatsbyImageData
            }
            featuredImage {
              id
              gatsbyImageData
            }
          }
        }
      }
    }
  `)

  createAllProductsShopPage(data, actions)
  createCollectionShopAndProductPages(data, actions)
}
