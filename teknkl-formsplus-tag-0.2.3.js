/*
 * FormsPlus::Wrapper Row/Column Tagger
 * @author Sanford Whiteman, TEKNKL (blog.teknkl.com / sandy@teknkl.com)
 * @version v0.2.3
 * @copyright Copyright 2016, 2017, 2018, 2019, 2020 FigureOne, Inc.
 * @license Hippocratic 2.1: This license must appear with all reproductions of this software.
 */
window.FormsPlus = window.FormsPlus || {
  allDescriptors: {},
  allMessages: {},
  detours: {}
};

FormsPlus.tagWrappers = function tagWrappers() {
  /* common vars & aliases */
  var ANCESTORS_STOR = ".mktoFormRow, .mktoFormCol",
    INPUTS_STOR = "INPUT,SELECT,TEXTAREA,BUTTON,[data-name],.mktoPlaceholder,LEGEND",
    attrTag = "data-wrapper-for",
    attrDone = "data-initial-wrapper-tagging-complete",
    placeholderPrefix = /^mktoPlaceholder/,
    arrayify = getSelection.call.bind([].slice);

  /* utility fn to tag wrapper containers with inner form inputs */
  function tagMktoWrappers(formEl) {
    arrayify(formEl.querySelectorAll(ANCESTORS_STOR)).forEach(function(ancestor) {
      ancestor.setAttribute(attrTag, "");
      arrayify(ancestor.querySelectorAll(INPUTS_STOR)).forEach(function(input) {
        var currentTag = ancestor.getAttribute(attrTag);
        ancestor.setAttribute(attrTag, [
          currentTag ? currentTag : "", 
          input.id, 
          input.name != input.id ? input.name : "",
          input.getAttribute('data-name'),
          input.nodeName == "LEGEND" ? input.textContent : "",
          arrayify(input.classList)
            .filter(function(cls){
              return placeholderPrefix.test(cls);
            })
            .map(function(cls){
              return cls.replace(placeholderPrefix,"");
            })
            .join(" ")
        ].join(" ").trim());
      });
    });
  }

  MktoForms2.whenRendered(function(form) {
    var formEl = form.getFormElem()[0];
    tagMktoWrappers(formEl);
    formEl.setAttribute(attrDone,"true");
  });

};

FormsPlus.tagWrappers();