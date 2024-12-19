import base64

def encode_to_base64():
    # Get user input
    text = input("Enter the text to encode: ")
    
    # Convert string to bytes and encode to base64
    encoded = base64.b64encode(text.encode('utf-8'))
    
    # Convert bytes back to string for printing
    encoded_str = encoded.decode('utf-8')
    
    print(f"Base64 encoded result: {encoded_str}")

if __name__ == "__main__":
    encode_to_base64()