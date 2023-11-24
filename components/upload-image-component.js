import { uploadImage } from "../api.js";

export function renderUploadImageComponent({ element, onImageUrlChange }) {
  let imageUrl = "";

  const render = () => {
    element.innerHTML = `
      <div class="upload=image">
          ${imageUrl
        ? `
              <div class="file-upload-image-conrainer">
                <img class="file-upload-image" src="${imageUrl}">
                <button class="file-upload-remove-button button">Replace photo</button>
              </div>
              `
        : `
                <label class="file-upload-label secondary-button">
                    <input
                      type="file"
                      class="file-upload-input"
                      style="display:none"
                    />
                    Choose photo
                </label>
              
          `
      }
      </div>
    `;

    const fileInputElement = element.querySelector(".file-upload-input");

    fileInputElement?.addEventListener("change", () => {
      const file = fileInputElement.files[0];
      if (file) {
        const lableEl = document.querySelector(".file-upload-label");
        lableEl.setAttribute("disabled", true);
        lableEl.textContent = "Uploading file...";
        uploadImage({ file }).then(({ fileUrl }) => {
          imageUrl = fileUrl;
          onImageUrlChange(imageUrl);
          render();
        });
      }
    });

    element
      .querySelector(".file-upload-remove-button")
      ?.addEventListener("click", () => {
        imageUrl = "";
        onImageUrlChange(imageUrl);
        render();
      });
  };

  render();
}
