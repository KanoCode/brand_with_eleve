import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category, Product } from "./apiTypes";

interface SavedProducts {
  [key: number]: any;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleFilterButtonClick = (
  selectedCategory: string,
  selectedFilters: any
) => {
  if (selectedFilters.includes(selectedCategory)) {
    let filtered = selectedFilters.filter(
      (el: string) => el !== selectedCategory
    );
    return filtered;
  } else {
    return [...selectedFilters, selectedCategory];
  }
};

export function capitalizeFirstLetter(str: string) {
  let strings = str
    .split(" ")
    .map((itm) => itm.charAt(0).toUpperCase() + itm.slice(1));

  return strings.join(" ");
}

export const generalPriceCalculation = (
  priceInRand: number,
  rate: number,
  percentage: number
) => {
  let percentProfit = Number(percentage) / 100;
  const priceInDollar: number = Number(priceInRand) * rate;

  let pricePercentage = priceInDollar * percentProfit;
  let genPrice = pricePercentage + priceInDollar;
  return genPrice;
};

export const getMarketHubRate = (localForexArr: any, currentRate: number) => {
  // let markerHubRate;

  let lc = localForexArr.find((elemnt: any) => {
    let u = Number(elemnt.upper);
    let l = Number(elemnt.lower);
    let use = Number(elemnt.use);

    if (currentRate <= u && currentRate > l) {
      return use;
    }
  });

  return lc.use;
};

export function checkIsPriceAvailable(prices: any, productCode: string) {
  return prices[productCode] ? true : false;
}

export function createPaginationScope(paginatedArr: any[]) {
  let scoped: any = [];
  let pageIdx = 0;

  const convertedObject: SavedProducts = paginatedArr?.reduce(
    (arr: SavedProducts, item: any, index: number) => {
      arr[index] = item;

      pageIdx += item.length;

      scoped.push(pageIdx);
      return arr;
    },
    {}
  );

  return scoped;
}

export function paginate(arr: any, size: number) {
  return arr?.reduce((acc: any, val: any, i: number) => {
    let idx = Math.floor(i / size);
    let page = acc[idx] || (acc[idx] = []);
    page.push(val);

    return acc;
  }, []);
}

export function keyWordProductFilters(products: any) {
  let tagsCount = {};
  let colorsArray: any = [];
  let uniqueColorsOnly = new Set();
  let uniqueTagsOnly = new Set();
  let uniqueTypesOnly = new Set();
  let uniqueCategories = new Set();
  let uniqueFits = new Set();
  let gender = new Set();
  let uniqueSize = new Set();
  let brandingTechniques = new Set();
  let uniqueMaterials = new Set();

  let tagsArray: any = [];

  let trackBrands: any = {};
  let trackCategories: any = {};
  let trackGenderItems: any = {};
  let trackSizes: any = {};
  let trackBrandingTechniques: any = {};
  let trackMaterials: any = {};
  let trackUnbranded: any = { count: 0 };
  let trackFits: any = {};
  let trackTypeIdx: any = {};

  let productsArray = products;

  productsArray = productsArray?.map((product: any) => {
    if (product.colourImages) {
      if (
        !uniqueColorsOnly.has(
          product.colourImages[0].name + "/" + product.colourImages[0].code
        )
      ) {
        colorsArray.push(
          product.colourImages[0].name + "/" + product.colourImages[0].code
        );
        uniqueColorsOnly.add(
          product.colourImages[0].name + "/" + product.colourImages[0].code
        );
      }
    }

    if (product.categories) {
      product.categories.map((category: any) => {
        if (!uniqueCategories.has(category.name)) {
          uniqueCategories.add(category.name);
          trackCategories[category.name] = {
            [category.name]: category.path,
            count: 1,
          };
          uniqueTagsOnly.add(category.name);
        } else {
          trackCategories[category.name]["count"] += 1;
        }
      });
    }

    if (product.brand) {
      if (!uniqueTagsOnly.has(product.brand.name)) {
        trackBrands[product.brand.name] = {
          [product.brand.name]: product.brand,
          count: 1,
        };
        uniqueTagsOnly.add(product.brand.name);
      } else {
        trackBrands[product.brand.name]["count"] += 1;
      }
    }
    if (product.type) {
      if (!uniqueTypesOnly.has(product.type)) {
        uniqueTypesOnly.add(product.type);
        trackTypeIdx[product.type] = 1;
      } else {
        trackTypeIdx[product.type] += 1;
      }
    }

    if (product.fits) {
      if (!uniqueFits.has(product.fit)) {
        uniqueFits.add(product.fit);
        trackFits[product.fit] = 1;
      } else {
        trackFits[product.fit] += 1;
      }
    }

    if (product.genders) {
      if (!gender.has(product.gender)) {
        trackGenderItems.add(product.gender);
        trackGenderItems[product.gender] = 1;
      } else {
        trackGenderItems[product.gender] += 1;
      }
    }

    if (product.material) {
      if (!uniqueMaterials.has(product.material)) {
        uniqueMaterials.add(product.material);
        trackMaterials[product.material] = 1;
      } else {
        trackMaterials[product.material] += 1;

        // trackGenderItems[product.gender] += 1;
      }
    }

    return { ...product };
  });

  return {
    colors: colorsArray,
    typesObj: trackTypeIdx,
    fitsObj: trackFits,
    materialsObj: trackMaterials,
    categoriesObj: trackCategories,
    gendersObj: trackGenderItems,
    products,
    brandsObj: trackBrands,
  };
}

export function filterBadges(filters: string[], products: Product[]) {
  const findColour = filters.filter((item) => {
    return item.includes("colourImages");
  });

  const findBrand = filters.filter((item) => {
    return item.includes("brand");
  });

  const findMaterial = filters.filter((item) => {
    return item.includes("material");
  });

  const findGender = filters.filter((item) => {
    return item.includes("gender");
  });

  const findType = filters.filter((item) => {
    return item.includes("type");
  });

  let colorsToFilter = findColour.map(
    (color: string) => color.split("-")[1]
  )[0];
  let materialsToFilter = findMaterial.map((material: string) =>
    material.split("-")[1].toLowerCase()
  )[0];
  let brandsToFilter = findBrand.map((brand: string) => brand.split("-")[1])[0];
  let typesToFilter = findType.map((type: string) => type.split("-")[1])[0];
  let gendersToFilter = findGender.map(
    (gender: string) => gender.split("-")[1]
  )[0];

  return products.filter((product: Product) => {
    let matchesGender, matchesMaterial, matchesBrand, matchesType, matchesColor;
    if (findColour.length > 0) {
      matchesColor = product.colourImages
        ? product.colourImages.some((colourImage) => {
            return colorsToFilter.includes(colourImage.name);
          })
        : false;
    }
    if (findBrand.length > 0) {
      matchesBrand =
        brandsToFilter.length > 0
          ? product.brand !== null &&
            brandsToFilter.includes(product.brand.name)
          : true;
    }

    if (findMaterial.length > 0) {
      matchesMaterial = materialsToFilter.includes(product.material);
    }

    if (findGender.length > 0) {
      matchesGender = gendersToFilter.includes(product.gender || "");
    }

    if (findType.length > 0) {
      matchesType = typesToFilter.includes(product.type);
    }

    return (
      matchesColor ||
      matchesMaterial ||
      matchesGender ||
      matchesType ||
      matchesBrand
    );
  });
}

export function sanitizeProductDataForSearchIndexing(products: Product[]) {
  return products.map((product) => {
    return {
      simpleCode: product.simpleCode,
      fullCode: product.fullCode,
      feature: product.feature,
      gender: product.gender,
      productName: product.productName,
      keywords: product.keywords,
      tags: product.tags,
      price: Number(product.price),
      fit: product.fit,
      variants: product.variants?.map((variant) => variant.fullCode),
      color: product.colourImages?.map((img) => img.name),
      material: product.material,
      categories: product.categories.map((cat) => cat.name),
      brand: product.brand?.name,
      image: product.images.find((img) => img.isDefault)?.urls[0]?.url,
    };
  });
}

// Function to chunk the array of products
export function chunkArray(products: any[], maxChunkSize: number) {
  let chunks = [];
  let currentChunk: any[] = [];
  let currentChunkSize = 0;

  products.forEach((product) => {
    const productSize = getSizeInBytes(product);

    if (currentChunkSize + productSize > maxChunkSize) {
      chunks.push(currentChunk);
      currentChunk = [];
      currentChunkSize = 0;
    }

    currentChunk.push(product);
    currentChunkSize += productSize;
  });

  // Push the last chunk if it has items
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

export function categorizeStockBySimpleId(stock: any[]) {
  let categorizedStock: any = {};

  for (let stockItm of stock) {
    if (categorizedStock[stockItm.simpleCode]) {
      categorizedStock[stockItm.simpleCode].push(stockItm);
    } else {
      categorizedStock[stockItm.simpleCode] = [stockItm];
    }
  }

  // for(let i in categorizedStock){

  //   categorizedStock[i]
  // }

  return categorizedStock;
}

export function stockChunkArray(products: Product[], maxChunkSize: number) {
  let chunks = [];
  let currentChunk: any[] = [];
  let currentChunkSize = 0;

  products.forEach((product) => {
    const productSize = getSizeInBytes(product);

    if (currentChunkSize + productSize > maxChunkSize) {
      chunks.push(currentChunk);
      currentChunk = [];
      currentChunkSize = 0;
    }

    currentChunk.push(product);
    currentChunkSize += productSize;
  });

  // Push the last chunk if it has items
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

// Function to estimate the size of a JSON object in bytes
function getSizeInBytes(product: Product) {
  return Buffer.byteLength(JSON.stringify(product), "utf8");
}

export function getPromoItems(categories: Category[], isHitComponent = false) {
  let keywords = "all clearance items";
  let keywords1 = "marked to clear";

  if (!isHitComponent) {
    return categories.some(
      (category: any) =>
        category.name.toLowerCase().includes(keywords?.toLowerCase()) ||
        category.code.toLowerCase().includes(keywords?.toLowerCase()) ||
        category.path.toLowerCase().includes(keywords?.toLowerCase()) ||
        category.code.toLowerCase().includes(keywords1?.toLowerCase()) ||
        category.path.toLowerCase().includes(keywords1?.toLowerCase()) ||
        category.name.toLowerCase().includes(keywords1?.toLowerCase())
    );
  } else {
    return categories.some((category: any) => {
      return (
        category.toLowerCase().includes(keywords?.toLowerCase()) ||
        category.toLowerCase().includes(keywords1?.toLowerCase())
      );
    });
  }
}

// cart manipulation methods

export function handleQuantityIncreament(item: any, cart: any[]) {
  return cart.map((cartItem) => {
    if (cartItem.id === item.id) {
      return { ...cartItem, quantity: cartItem.quantity + 1 };
    }
    return cartItem;
  });
}

export function handleItemDelete(item: any, cart: any[]) {
  return cart.filter((cartItem) => {
    return cartItem.id != item.id;
  });
}

export function handleQuantityDecreament(item: any, cart: any[]) {
  return cart.map((cartItem) => {
    if (cartItem.id === item.id && cartItem.quantity > 0) {
      return { ...cartItem, quantity: cartItem.quantity - 1 };
    }
    return cartItem;
  });
}
