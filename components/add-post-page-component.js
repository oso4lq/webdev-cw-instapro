import { renderUploadImageComponent } from './upload-image-component.js'
import { renderHeaderComponent } from './header-component.js'

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {

  let imageUrl = '';

  const appHTML = `
  <div class="page-container">
    <div class="header-container"></div>
      <div class="form">
          <h3 class="form-title">Add post</h3>
      <div class="form-inputs">
          <div class="upload-image-container">
              <div class="upload-image">
                  <label class="file-upload-label secondary-button">
                      <input type="file" class="file-upload-input" style="display:none">Choose photo
                  </label>
              </div>
          </div>
              <label>Description:
                  <textarea class="input textarea" rows="4" id="description"></textarea>
              </label>
                  <button class="button" id="add-button">Post</button>
              </div>
          </div>
      </div>
   </div>
  `

  appEl.innerHTML = appHTML;

  renderHeaderComponent({
    element: document.querySelector('.header-container'),
  });

  renderUploadImageComponent({
    element: document.querySelector('.upload-image-container'),
    onImageUrlChange(newImageURL) {
      imageUrl = newImageURL
    },
  });

  document.getElementById('add-button').addEventListener('click', () => {
    const description = document.getElementById('description').value

    onAddPostClick({
      description: description,
      imageUrl: imageUrl,
    })
  })
}