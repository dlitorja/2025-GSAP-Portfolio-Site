# Gallery Setup Guide - Troubleshooting Multiple Images

## Common Issue: Only One Image Shows Up

If you've added multiple photos to a gallery item in Prismic but only see one image, here are the most common causes and solutions:

## ✅ Correct Setup Steps

### 1. Use the "Image Gallery" Field (Not "Single Image")

When creating a gallery item with multiple photos:

1. **Go to the "Media" section** in your Prismic document
2. **Set "Media Type"** to **"Image Gallery"** (not "Single Image")
3. **Scroll down to "Image Gallery"** field
4. **Click "Add item"** to add each photo
5. For each item:
   - Click the image field and upload/select your photo
   - Optionally add a caption
6. **Save and Publish** the document

### 2. Field Structure

The correct field structure is:
```
Media Type: Image Gallery
├── Image Gallery (Group field)
    ├── Item 1
    │   ├── Gallery Image (Image field)
    │   └── Image Caption (Text field - optional)
    ├── Item 2
    │   ├── Gallery Image (Image field)
    │   └── Image Caption (Text field - optional)
    └── ... (add more items as needed)
```

### 3. Common Mistakes

❌ **Wrong:** Adding images to "Single Image" field  
✅ **Right:** Add images to "Image Gallery" field

❌ **Wrong:** Setting Media Type to "Single Image" but adding multiple images  
✅ **Right:** Set Media Type to "Image Gallery" when you have multiple images

❌ **Wrong:** Not publishing the document after adding images  
✅ **Right:** Always click "Publish" after making changes

❌ **Wrong:** Adding images but not clicking "Add item" in the Image Gallery group  
✅ **Right:** Each photo needs to be added as a separate item in the Image Gallery group

## 🔍 Debugging

If images still don't show up:

1. **Check the browser console** (F12 → Console tab) when viewing the gallery item
   - Look for debug messages showing what data was received
   - Check if `imageGallery` is an array with items

2. **Verify in Prismic:**
   - Open your gallery document
   - Check that "Image Gallery" field has items
   - Each item should have an image uploaded
   - Make sure the document is **Published** (not just saved as draft)

3. **Check the page:**
   - In development mode, you'll see a yellow debug box if no images are found
   - This shows what fields are populated

## 📝 Quick Checklist

- [ ] Media Type is set to "Image Gallery" (not "Single Image")
- [ ] Image Gallery field has at least one item added
- [ ] Each item in Image Gallery has an image uploaded
- [ ] Document is Published (not just saved)
- [ ] Wait a few seconds after publishing for changes to propagate

## 🎯 Example: Creating a Photography Gallery

1. Create a new Gallery document
2. Fill in Title, Description, Category (set to "Photography")
3. In the **Media** section:
   - Set **Media Type** to **"Image Gallery"**
   - Scroll to **"Image Gallery"** field
   - Click **"Add item"**
   - Upload your first photo
   - Add caption if desired
   - Click **"Add item"** again for the next photo
   - Repeat for all photos
4. Save and **Publish**
5. View the gallery item - all photos should display in a grid

## 💡 Tips

- You can add as many images as you want to the Image Gallery
- Each image can have its own caption
- The gallery will display in a responsive grid (2 columns on tablet, 3 on desktop)
- Images are displayed in the order you add them in Prismic

