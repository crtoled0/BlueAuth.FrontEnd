

export default class Tools {

    constructor(){
       // super();
    }

    fallbackCopyTextToClipboard(text) {
      return new Promise((resolve, reject) => {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();      
            try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            resolve();
            console.log('Fallback: Copying text command was ' + msg);
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
                reject();
            }
        
            document.body.removeChild(textArea);
        });
    }
    copyTextToClipboard(text) {
       return new Promise((resolve, reject) => {
              if (!navigator.clipboard) {
                return this.fallbackCopyTextToClipboard(text);
              }
              navigator.clipboard.writeText(text).then(function() {
                console.log('Async: Copying to clipboard was successful!');
                resolve();
              }, function(err) {
                console.error('Async: Could not copy text: ', err);
                reject();
              });
        });
    }
}