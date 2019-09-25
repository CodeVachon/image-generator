# Image Generator

Read to [Documentation](https://codevachon.github.io/image-generator)

## Install as an NPM Module
add this to your .npmrc file.

```
@christophervachon:registry https://npm.christophervachon.com
```

and Download using NPM Scope `@christophervachon`

```
npm install @christophervachon/image-generator
```

## Usage

```js
import { defaultImage } from "@christophervachon/image-generator";

export default ImageNode = () => (<img src={ defaultImage("Test String") } alt="Test String" />);
```

<img src="https://blog.christophervachon.com/content/images/2019/09/download.png" alt="Test Image" />

