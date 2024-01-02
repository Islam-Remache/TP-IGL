"""
for instant the title and the abstract and the keywords extraction is working but not for all documents 
"""


import PyPDF2
from pdfminer.layout import LTTextContainer, LTChar
from pdfminer.high_level import extract_pages
from pathlib import Path
from typing import Iterable, Any

def extract_title_from_pdf(pdf_file_path):
    path = Path(pdf_file_path).expanduser()
    pages = extract_pages(path)
    #go to the first page
    page = next(pages)
    # get the biggest font size and the text that has this font size
    biggest_font_size = 0
    biggest_font_size_text = ""
    for element in page:
        #we will not count the headers of the page 
        #so any element that is inside a rectangle will not be counted
        if isinstance(element, LTTextContainer):
            for text_line in element:
                if isinstance(text_line, LTTextContainer):
                    for character in text_line:
                        if isinstance(character, LTChar):
                            if character.size > biggest_font_size:
                                biggest_font_size = character.size
                elif isinstance(text_line, LTChar):
                    if text_line.size > biggest_font_size:
                        biggest_font_size = text_line.size
    # now we have the biggest_font_size , we will get the text that has this font size
    # note that the title might be in multiple lines 
    # we have also the problem where the title in this function can remove white spaces between words
    # so we will take in mind the white spaces between words
    for element in page:
        if isinstance(element, LTTextContainer):
            for text_line in element:
                if isinstance(text_line, LTTextContainer):
                    for character in text_line:
                        if biggest_font_size_text !="" and character.get_text() == " ": 
                                biggest_font_size_text += character.get_text()
                                continue
                        if biggest_font_size_text !="" and character.get_text() == "\n": 
                                biggest_font_size_text += " "
                                continue
                        if isinstance(character, LTChar):
                            if character.size == biggest_font_size:
                                biggest_font_size_text += character.get_text()
                elif isinstance(text_line, LTChar):
                    if biggest_font_size_text !="" and text_line.get_text() == " ": 
                                biggest_font_size_text += text_line.get_text()
                                continue
                    if biggest_font_size_text !="" and text_line.get_text() == "\n": 
                                biggest_font_size_text += " "
                                continue
                    if text_line.size == biggest_font_size:
                        biggest_font_size_text += text_line.get_text()
    # remove the white spaces at the beginning and at the end of the string
    biggest_font_size_text = biggest_font_size_text.strip()
    return biggest_font_size_text
def extract_sections_from_pdf(pdf_file_path):
    path = pdf_file_path
    pages = extract_pages(path)
    
    # Iterate through the pages
    for page_num, page in enumerate(pages, start=1):
        # Check if the page number is 1 (assuming abstract and keywords are on the first page)
        content = []
        if page_num == 1:
            abstract = False
            keywords = False
            abstract_content = None
            keywords_content = None
            # Iterate through the elements on the page
            for element in page:
                if isinstance(element, LTTextContainer):
                    text = element.get_text()
                    if abstract:
                        abstract_content = text
                        abstract = False
                    if keywords:
                        keywords_content = text
                        keywords = False

                    # Check for the abstract in the text to lowercase
                    if abstract_content== None and "abstract" in text.lower():
                        #so the next element is the abstract content
                        #there is a chance that the content of the abstract is in the same element 
                        #so we will check if the length of the text is more than 10 for refrence 
                        if len(text) > 10:
                            abstract_content = text
                            continue
                        abstract = True
                        continue
                    if keywords_content == None and "keywords" in text.lower():
                        #so the next element is the keywords content
                        #there is a chance that the content of the keywords is in the same element 
                        #so we will check if the length of the text is more than 10 for refrence 
                        if len(text) > 10:
                            keywords_content = text
                            continue
                        keywords = True
                        continue
    #find the word "Abstract" or "ABSTRACT" or "abstract" in begining of the abstract_content
    #and remove it 
    if abstract_content != None:
        abstract_content = abstract_content.replace("Abstract", "")
        abstract_content = abstract_content.replace("ABSTRACT", "")
        abstract_content = abstract_content.replace("abstract", "")
    #find the word "Keywords" or "KEYWORDS" or "keywords" in begining of the keywords_content
    #and remove it
    if keywords_content != None:
        keywords_content = keywords_content.replace("Keywords", "")
        keywords_content = keywords_content.replace("KEYWORDS", "")
        keywords_content = keywords_content.replace("keywords", "")
        
                    
    
    #remove any "\n" and replace it with " " 
        # if the last word in the line ends with "-" then just remove the "-" and continue the word in the next line
    if abstract_content != None:
        abstract_content = abstract_content.replace("\n", " ")
        abstract_content = abstract_content.replace("- ", "")
    if keywords_content != None:
        keywords_content = keywords_content.replace("\n", " ")
        keywords_content = keywords_content.replace("- ", "")
    
    print("Abstract : \n" ,abstract_content)
    print("keywords : \n", keywords_content)




def extract_content_in_range(page, start_y, end_y):
    """
    Extracts text content within a specified vertical range on a page.
    """
    content = ""
    for element in page:
        if isinstance(element, LTTextContainer) and start_y <= element.y1 <= end_y:
            content += element.get_text()
    return content


# Example usage:
pdf_file_path = "./tests/Article_01.pdf"
title = extract_title_from_pdf(pdf_file_path)
print(title)
extract_sections_from_pdf(pdf_file_path)