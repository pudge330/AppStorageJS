# AppStorageJS

Standard browser Session and Local storage plus live document storage all rolled into one. With added cache support.

* Under 3kb minified
* Just over 4kb with TagLoader loaded
* Added cache support
* No Dependencies
* Works with or without jQuery
* Simple and easy to use

## Getting Started
Download and add `AppStorage` to your project.

```html
<script src="/scripts/AppStorage.min.js" type="text/javascript"></script>
```

For live document `page` support also include the TagLoader library.

```html
<script src="/scripts/TagLoader.min.js" type="text/javascript"></script>
<script src="/scripts/AppStorage.min.js" type="text/javascript"></script>
```

### Instantiate a new instance of AppStorage, passing in TagLoader if using the `page` storage emgine.

```javascript
//--without TagLoader, only supports local and session storage
//--useful if you only need the caching feature
var appStorage = new AppStorage();

//--with TagLoader
//--adds a live document storage engine `page`
var appStorage = new AppStorage(TagLoader);
```

## Using AppStorage

#### AppStorage.[engine].supported()

#### AppStorage.[engine].set(_k, _v, _e)

#### AppStorage.[engine].get(_k)

#### AppStorage.[engine].remove(_k)

#### AppStorage.[engine].clear()

#### AppStorage.[engine].length()

#### AppStorage.[engine].totalLength()