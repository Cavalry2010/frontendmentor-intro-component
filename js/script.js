"use strict";

class App {
  form = document.querySelector(".sign-up-form");
  submitBtn = document.querySelector(".submit-btn");

  constructor() {
    this.form.setAttribute("novalidate", "novalidate");
    this.form.addEventListener("submit", this.checkSubmit.bind(this));
  }

  checkSubmit(e) {
    e.preventDefault();
    let notEmpty = 0;
    let validMail = false;
    let validPw = false;

    const formElements = Array.from(this.form.children);

    formElements.forEach((ele) => {
      const eleChildren = Array.from(ele.children);

      eleChildren.forEach((child) => {
        if (child.tagName === "INPUT") {
          const input = child.value;
          const placeholder = child.getAttribute("placeholder");
          if (input === "") {
            this.showError(eleChildren, false, child, ele, placeholder);
            return;
          } else {
            this.removeError(eleChildren, ele);
            notEmpty++;
          }
        }
        if (child.tagName === "INPUT" && child.id === "mail") {
          const input = child.value;
          if (!this.validateEmail(input)) {
            this.showError(eleChildren, "mail", child, ele);
          } else {
            validMail = true;
          }
        }

        if (child.tagName === "INPUT" && child.id === "password") {
          const input = child.value;
          if (input.length < 8) {
            this.showError(eleChildren, "pw", child, ele);
          } else {
            validPw = true;
          }
        }
      });
    });
    if (validMail && validPw && notEmpty === 4) {
      this.showSuccess();
      this.disableForm(formElements);
    }
  }

  showError(elements, msg, child, ele, placeholder) {
    const message = elements[1];
    const icon = elements[2];
    if (msg === "mail") {
      message.textContent = "Looks like this is not an email";
    } else if (msg === "pw") {
      message.textContent = "Password must be at least 8 characters long";
    } else {
      message.textContent = `${placeholder} cannot be empty`;
    }
    message.classList.add("form-message--error");
    icon.classList.add("error-icon--active");
    child.style.border = "solid 1px #ff7a7a";
    ele.classList.add("margin-bottom-sm");
  }

  removeError(elements, ele) {
    elements.forEach((child) => {
      child.classList.remove("form-message--error", "error-icon--active");
      if (child.tagName === "INPUT") {
        child.style.border = "solid 1px #b9b6d3";
      }
    });
    ele.classList.remove("margin-bottom-sm");
  }

  showSuccess() {
    setTimeout(function () {
      document
        .querySelector(".success-msg")
        .classList.add("success-msg--active");
      document
        .querySelector(".terms-text")
        .classList.add("terms-text--success");
    }, 200);
  }

  disableForm(formElements) {
    formElements.forEach((ele) => {
      const eleChildren = Array.from(ele.children);
      eleChildren.forEach((child) => {
        if (child.tagName === "INPUT") {
          child.value = "";
          child.setAttribute("disabled", "disabled");
          child.classList.add("disabled");
        }
      });
    });
    this.submitBtn.setAttribute("disabled", "disabled");
    this.submitBtn.classList.add("disabled");
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}

const app = new App();
