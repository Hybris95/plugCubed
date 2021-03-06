define(['plugCubed/Class', 'plugCubed/dialogs/ControlPanel', 'plugCubed/StyleManager', 'plugCubed/RSS'], function(Class, ControlPanel, Styles, RSS) {
    var handler, $contentDiv, $formDiv, $localFileInput, panel;

    handler = Class.extend({
        register: function() {
            panel = ControlPanel.addPanel('Background');

            $contentDiv = $('<div>').append($('<p>').text('Set your own room background.'));

            panel.addContent($contentDiv);

            $formDiv = $('<div>').width(500).css('margin', '25px auto auto auto');

            if (window.File && window.FileReader && window.FileList && window.Blob) {
                $localFileInput = ControlPanel.inputField('file', undefined, 'Local file').change(function(e) {
                    if (!(function() {
                            var files = e.target.files;

                            for (var i = 0, f; f = files[i]; i++) {
                                // Only process image files.
                                if (!f.type.match('image.*')) {
                                    continue;
                                }

                                var reader = new FileReader();

                                // Closure to capture the file information.
                                reader.onload = function(e) {
                                    Styles.set('rss-background-image', '.room-background { background-image: url(' + e.target.result + ')!important; }');
                                };

                                // Read in the image file as a data URL.
                                reader.readAsDataURL(f);
                                return true;
                            }
                            return false;
                        })()) {
                        RSS.execute();
                    }
                });
                $formDiv.append($localFileInput);
            } else {
                $localFileInput = 'Sorry, your browser does not support this';
                $formDiv.append($localFileInput);
            }

            panel.addContent($formDiv);
        },
        close: function() {
            ControlPanel.removePanel(panel);
        }
    });
    return new handler();
});