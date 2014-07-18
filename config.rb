# Require any additional compass plugins here.
require "susy"
require "breakpoint"

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "source/css"
sass_dir = "source/css"
images_dir = "source/images"
javascripts_dir = "source/js"
fonts_dir = "source/fonts"

output_style = :nested

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false
color_output = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass source/css scss && rm -rf sass && mv scss sass
preferred_syntax = :scss
