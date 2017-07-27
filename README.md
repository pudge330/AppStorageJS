# AppStorageJS

Standard browser Session and Local storage plus live document storage all rolled into one. With added cache support.

* Under 3kb minified
* Only 4.2kb with TagLoader loaded
* Added cache support
* No Dependencies
* Works without jQuery
* Simple and easy to use

## Getting Started
Download and add `AppStorage` to your project.

```html
<script src="/scripts/AppStorage.min.js" type="text/javascript"></script>
```

For live document `page` support also include the `TagLoader` library.

```html
<script src="/scripts/TagLoader.min.js" type="text/javascript"></script>
<script src="/scripts/AppStorage.min.js" type="text/javascript"></script>
```

Instantiate a new instance of `AppStorage`, passing in `TagLoader` if using the `page` storage engine.

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

```javascript
//--session storage
if (appStorage.session.supported()) {
  //--do something
}

//--local storage
if (appStorage.local.supported()) {
  //--do something
}

//--page storage
if (appStorage.page.supported()) {
  //--do something
}
```

#### AppStorage.[engine].set(_k, _v, _e)

```javascript
//--session storage
appStorage.session.set('mykey', {name: "AppStorage"});

//--local storage
appStorage.local.set('mykey', {name: "AppStorage"});

//--page storage
appStorage.page.set('mykey', {name: "AppStorage"});

//--setting the cache expiration, in seconds
appStorage.session.set('mykey', {name: "AppStorage"}, 60); //--one minute

appStorage.session.set('mykey', {name: "AppStorage"}, 60 * 60); //--one hour
```

#### AppStorage.[engine].get(_k)

```javascript
//--session storage
console.log(appStorage.session.set('mykey', {name: "AppStorage"}));

//--local storage
console.log(appStorage.local.set('mykey', {name: "AppStorage"}));

//--page storage
console.log(appStorage.page.set('mykey', {name: "AppStorage"}));
```

#### AppStorage.[engine].remove(_k)

```javascript
//--session storage
appStorage.session.remove('mykey');

//--local storage
appStorage.local.remove('mykey');

//--page storage
appStorage.page.remove('mykey');
```

#### AppStorage.[engine].clear()

```javascript
//--session storage
console.log(appStorage.session.clear());

//--local storage
console.log(appStorage.local.clear());

//--page storage
console.log(appStorage.page.clear());
```

#### AppStorage.[engine].length()

```javascript
//--session storage
console.log(appStorage.session.length());

//--local storage
console.log(appStorage.local.length());

//--page storage
console.log(appStorage.page.length());
```

#### AppStorage.[engine].totalLength()

```javascript
//--session storage
console.log(appStorage.session.totalLength());

//--local storage
console.log(appStorage.local.totalLength());

//--page storage
console.log(appStorage.page.totalLength());
```

## Functions

**supported()** - *bool* - Determines whether or not that particular engine is suppoorted

**set(_k, _v, _e)** - Stores a value
  * ___k__ - *string* - The data's key
  * ___v__ - *mixed* - Data to be stored
  * ___c__ - *int* - Data's expiration in seconds

**get(_k)** - *mixed* - Return the stored value if found, `null` if not or if value has expired
  * ___k__ - *string* - The data's key

**remove(_k)** - Deletes a value by key
  * ___k__ - *string* - The data's key

**clear()** - Clears all value in that storage engine

**length()** - *int* - Gets size/count of the stored data
  * For `session` and `local` storage `length()` return the amount of data objects minus any stored expiration times
  * For `page` storage `length()` returns the amount of data stored in that paticular `AppStorage` instance

**totalLength()** - *int* - Gets total size/count of stored data
  * For `session` and `local` storage `totalLength()`  return the amount of data objects including any stored expiration times
  * For `page` storage `totalLength()`  returns the amount of data stored in all instances of `AppStorage`