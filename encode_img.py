import base64
import io
from PIL import Image


def reduce_image_size_and_return_base64(image_path):
    # Open the image
    image = Image.open(image_path)

    # Get the original image size
    original_size = image.size

    # Calculate the new size
    new_size = (original_size[0] // 15, original_size[1] // 15)

    # Resize the image
    resized_image = image.resize(new_size)

    # Convert the resized image to bytes
    byte_arr = io.BytesIO()
    resized_image.save(byte_arr, format='PNG')
    encoded_image = base64.b64encode(byte_arr.getvalue())

    # Convert the bytes to a string and prepend it with the necessary data for an HTML image tag
    html_ready_string = "data:image/png;base64," + encoded_image.decode('utf-8')

    return html_ready_string


# Usage
base64_string = reduce_image_size_and_return_base64('diplome.png')

# print result in result.txt
with open('result.txt', 'w') as file:
    file.write(base64_string)
