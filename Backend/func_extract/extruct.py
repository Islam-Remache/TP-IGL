# the main function of this script is process_pdf_file
import PyPDF2
from pdfminer.layout import LTTextContainer, LTChar
from pdfminer.high_level import extract_pages
from pathlib import Path
from openai import OpenAI
from typing import Iterable, Any
import datetime
import fitz
from base64 import b64encode
from dotenv import load_dotenv
load_dotenv()

def extract_title_from_pdf(pdf_file_path):
    """
    this function to get the title of the pdf file
    we assume that the title has the biggest font size in the pdf file
    while taking into considiration that the title might be in multiple lines
    note that in some pdf files the title is not the biggest text in the pdf file or the title is not in the first page of the pdf file , in that case the function will not work properly
    """

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
    """
    this function take the path of a pdf file and return a dictionary that contains the title , the abstract , the keywords , the authors , the institutions , the references and the inner text of the pdf file
    it uses the pdfminer library to extract the text from the pdf file
    so the identification of the sections is based on the position of the text on the page and all the work is been done manually
    it is very efficient for pdf files that are in the same format and the same structure
    """
    path = pdf_file_path
    pages = extract_pages(path)
    abstract = False
    keywords = False
    abstract_content = None
    keywords_content = None
    abstract_boundig_box = None
    keywords_boundig_box = None
    title = extract_title_from_pdf(pdf_file_path)
    title_boundig_box = None
    authors_inst = []
    
    # Iterate through the pages
    for page_num, page in enumerate(pages, start=1):
        # Check if the page number is 1 (assuming abstract and keywords are on the first page)
        content = []
        if page_num == 1:
            # Iterate through the elements on the page
            for element in page:
                if isinstance(element, LTTextContainer):
                    text = element.get_text()
                    # get the bounding box of the title 
                    if title_boundig_box == None and title.replace(" ", "") in text.replace("\n","").replace(" ", ""):
                        title_boundig_box = element.bbox
                    if text.strip() == "" or text.strip() == "\n" :
                        continue
                    # check if the element is below the abstract word 
                    # so it must start with the same x coordinate and the y coordinate must be lower than the y coordinate of the abstract word
                    if abstract == True and int(element.bbox[0]) == int(abstract_boundig_box[0]) and int(element.bbox[1]) < int(abstract_boundig_box[1]):
                        abstract_content = text
                        abstract = False
                        continue
                    # check if the element is below the keywords word
                    # so it must start with the same x coordinate and the y coordinate must be bigger than the y coordinate of the keywords word
                    if keywords == True and int(element.bbox[0]) == int(keywords_boundig_box[0]) and int(element.bbox[1]) > int(keywords_boundig_box[1]):
                        keywords_content = text
                        keywords = False
                        continue

                    # Check for the abstract in the text to lowercase
                    # it may also appear in diffrent styles like this A B S T R A C T
                        # so we must take that in mind
                    if abstract_content== None and "abstract" in text.lower().replace(" ", ""):
                        #so the next element is the abstract content
                        #there is a chance that the content of the abstract is in the same element 
                        #so we will check if the length of the text is more than 10 for refrence 
                        if len(text.strip()) > 16:
                            abstract_content = text
                            abstract_boundig_box = element.bbox
                            continue
                        abstract = True
                        # we will get the text form the element that sit directly blow the word "abstract"
                        # note that the pdf file might be in tow columns so we need to get the bounding box of the element
                        # and check if the element is in the same column or not
                        # if the element is in the same column then we will get the text from it
                        # if the element is in the other column then we will get the text from the next element
                        # we will get the bounding box of the element by getting the bounding box of the first character in the element
                        # and the bounding box of the last character in the element
                        # we will get the bounding box of the element that sit directly blow the word "abstract"
                        abstract_boundig_box = element.bbox
                        continue
                    if keywords_content == None and "keywords" in text.lower().replace(" ", ""):
                        #so the next element is the keywords content
                        #there is a chance that the content of the keywords is in the same element 
                        #so we will check if the length of the text is more than 10 for refrence 
                        if len(text) > 20:
                            keywords_content = text
                            keywords_boundig_box = element.bbox
                            continue
                        keywords = True
                        keywords_boundig_box = element.bbox
                        continue
    #find the word "Abstract" or "ABSTRACT" or "abstract" in begining of the abstract_content
    #and remove it 
    if abstract_content != None:
        abstract_content = abstract_content.replace("Abstract", "").replace("ABSTRACT", "").replace("abstract", "").replace("a b s t r a c t", "").replace("A B S T R A C T", "")
    #find the word "Keywords" or "KEYWORDS" or "keywords" in begining of the keywords_content
    #and remove it
    if keywords_content != None:
        keywords_content = keywords_content.replace("Keywords", "").replace("KEYWORDS", "").replace("keywords", "")
                    
    
    #remove any "\n" and replace it with " " 
        # if the last word in the line ends with "-" then just remove the "-" and continue the word in the next line
    if abstract_content != None:
        abstract_content = abstract_content.replace("\n", " ").replace("- ", "")
    if keywords_content != None:
        keywords_content = keywords_content.replace("-\n", "").replace("\n", ",").replace("- ", "").replace(":", "")
        
    
    # convert the keywords_content to a list of keywords
    if keywords_content != None:
        keywords_content = keywords_content.split(",")
        #remove any white spaces at the beginning and at the end of the keywords
        for i in range(len(keywords_content)):
            keywords_content[i] = keywords_content[i].strip()
        #remove any empty keywords
        keywords_content = list(filter(None, keywords_content))
    # extract the authors and the institutions at once 
    # what we know is that the authors and the institutions are between the title and what ever come first between the abstract and the keywords
    # to get that we extract the elements that has y coordinate between the y coordinate of the title and the max y coordinate between the abstract or the keywords
    pages = extract_pages(path)
    if abstract_boundig_box != None and keywords_boundig_box != None:
        max_y = max(abstract_boundig_box[3], keywords_boundig_box[3])
    elif abstract_boundig_box != None:
        max_y = abstract_boundig_box[3]
    elif keywords_boundig_box != None:
        max_y = keywords_boundig_box[3]
    for page_num, page in enumerate(pages, start=1):
        # Check if the page number is 1 (assuming abstract and keywords are on the first page)
        content = []
        if page_num == 1:
            # Iterate through the elements on the page
            for element in page:
                if isinstance(element, LTTextContainer):
                    text = element.get_text()
                    print("first cond",int(element.bbox[3]) < int(title_boundig_box[1]))
                    print("second cond",int(element.bbox[1]) > int(max_y))

                    # the bbox of the title is in the form of (x0, y0, x1, y1)
                    # while x0 and y0 are the coordinates of the bottom left corner of the bbox
                    # and x1 and y1 are the coordinates of the top right corner of the bbox
                    # we will check if the y coordinate of the element is between the y coordinate of the title and the max y coordinate between the abstract or the keywords
                    if int(element.bbox[3]) < int(title_boundig_box[1]) and int(element.bbox[1]) > int(max_y): 
                        authors_inst += text.split("\n")
    #remove any empty authors
    authors_inst = list(filter(None, authors_inst))
    #now ceparate the authors from the institutions
    authors = []
    institutions = [""]*len(authors_inst)
    # ok so the author is the first string , the second string is the institution
    # all the strings that comes after the first string are the institution name devided untile we find an email adress , then the next string is the author and so on 
    # for example :
    # author1 , instit1_p1 , instit1_p2, ... , xxx@xxx.xx , author2 , ...
    # we detect the email adress if it has @ in it 
    # the the split will be like this :
    # authors = [author1, author2, ...]
    # institutions = [instit1_p1+" "+instit1_p2+" "+..., instit2_p1+" "+instit2_p2+" "+..., ...]
    # and skip the email adress
    i = 0
    while i < len(authors_inst)-1:
        if "@" in authors_inst[i]:
            authors.append(authors_inst[i+1])
            i+=2
            continue
        if i==0:
            authors.append(authors_inst[i])
            i+=1
            continue
        #add the string to institution of index len(authors)-1 
        institutions[len(authors)-1] += authors_inst[i] + " "
        i+=1

    #remove any empty institutions
    institutions = list(filter(None, institutions))
    #remove any white spaces at the beginning and at the end of the authors
    for i in range(len(authors)):
        authors[i] = authors[i].strip()
    #remove any white spaces at the beginning and at the end of the institutions
    for i in range(len(institutions)):
        institutions[i] = institutions[i].strip()
    #remove any empty authors
    authors = list(filter(None, authors))
        
    return abstract_content, keywords_content , authors, institutions
def extract_content_in_range(page, start_y, end_y):
    """
    Extracts text content within a specified vertical range on a page.
    """
    content = ""
    for element in page:
        if isinstance(element, LTTextContainer) and start_y <= element.y1 <= end_y:
            content += element.get_text()
    return content
    """
    this function uses gpt3.5 to identify what are those blocs of text that are beeing extracted 
    """




def extract_sections_from_pdf_gpt3(pdf_file_path):
    """
    this function take the path of a pdf file and return a dictionary that contains the title , the abstract , the keywords , the authors , the institutions , the references and the inner text of the pdf file
    it uses the openai gpt3.5 to extract the sections from the pdf file while maintaining the structure of the sections
    """
    # Extract text from the first page of the PDF
    text = extract_text_from_first_page_of_pdf(pdf_file_path)

    # Define OpenAI prompt
    def get_openai_response(prompt):
        openai = OpenAI()
        return openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": f"\n this is the text : \n{text}"}
            ],
        ).choices[0].message.content

    # Get the title of the article
    title_prompt = "get the title of this article , don't add any title to the response , just the title of the article "
    title = get_openai_response(title_prompt)

    # Get the authors of the article
    authors_prompt = "get directly the authors of this article , don't add any title or any thing to the response , just the name of the authors of the article separated by '\n' , this info will be used by a devloper "
    authors = get_openai_response(authors_prompt).split("\n")

    # Get the institutions of the authors
    institutions_prompt = "get the institutions of the authors of this article , don't add any title to the response , just the institutions of the article separated by '\n'"
    institutions = get_openai_response(institutions_prompt).split("\n")

    #Get the email of the institution
    email_prompt = "get the email of the institution of the authors of this article , don't add any title to the response , just the email of the institution of the article separated by '\n' , they must be in order with the institutions , those are the institutions" + str(institutions)
    emails = get_openai_response(email_prompt).split("\n")

    # Get the abstract section of the article
    abstract_prompt = "get the abstract section from this article without any changes , don't add any title to the response , just the abstract section of the article "
    abstract = get_openai_response(abstract_prompt)

    # Get the keywords section of the article
    keywords_prompt = "get the keywords section from this article without any changes  , don't add any title to the response , just the keywords section of the article  "
    keywords = get_openai_response(keywords_prompt).split(",")
    #get the references section of the article
    
    references_prompt = "get the references section from this article without any changes ,  don't add any title to the response , just the references section of the article separated by '\n'  "
    references = get_openai_response(references_prompt).split("\n")

    print ("===============================================")
    print("title : ", title)
    print("authors : ", authors)
    print("institutions : ", institutions)
    print("abstract : ", abstract)
    print("keywords : ", keywords)
    print("references : ", references)
    print ("===============================================")
    auth_inst = []
    for i in range(len(authors)):
        if i > len(institutions)-1:
            nom_inst = ""   
            aiobj = {"NomComplet": authors[i], "Institution": {"Nom": institutions[len(institutions)-1], "Email": emails[len(emails)-1]}}
            auth_inst.append(aiobj)
        else:
            aiobj = {"NomComplet": authors[i], "Institution": {"Nom": institutions[i], "Email": emails[i]}}
            auth_inst.append(aiobj)
    

    innerText = getInnerText(pdf_file_path)
    thumbnail = get_thumbnail_from_pdf(pdf_file_path)
    return_dict = {
        "Titre": title,
        "Resume": abstract,
        "TextIntegral": innerText,
        "Url": "ici/le/URL",
        "DatePublication":datetime.datetime.now().isoformat(),
        "estValidee": 0,
        "Image" : thumbnail,
        "Auteurs": auth_inst,
        "MotsCle": keywords,
        "References": references
    }
    return return_dict

# Function to extract text from the first page of a PDF file
def extract_text_from_first_page_of_pdf(pdf_file_path):
    """
    this function take the path of a pdf file and return the text of the first page of the pdf file as a utf-8 string
    it uses the pdfminer library to extract the text from the pdf file
    loop through the pages of the pdf file and extract the text from the text containers
    """
    path = pdf_file_path
    pages = extract_pages(path)
    page = next(pages)
    text = ""
    for element in page:
        if isinstance(element, LTTextContainer):
            text += element.get_text()
    return text
# Function to extract text from the last 10 pages of a PDF file
def extract_text_from_last_page_of_pdf(pdf_file_path):
    path = pdf_file_path
    pages = extract_pages(path)
    last_ten_pages = list(pages)[-10:]
    text = ""
    for page in last_ten_pages:
        for element in page:
            if isinstance(element, LTTextContainer):
                text += element.get_text()
    return text
#get innerText , just read it in utf-8
def getInnerText(pdf_file_path):
    """this function take the path of a pdf file and return the inner text of the pdf file as a utf-8 string
    it uses the pdfminer library to extract the text from the pdf file
    loop through the pages of the pdf file and extract the text from the text containers and the characters
    """
    path = pdf_file_path
    pages = extract_pages(path)
    text = ""
    for page in pages:
        for element in page:
            if isinstance(element, LTTextContainer):
                text += element.get_text()
            if isinstance(element, LTChar):
                text += element.get_text()
            if isinstance(element, Iterable):
                for subelement in element:
                    if isinstance(subelement, LTTextContainer):
                        text += subelement.get_text()
                    if isinstance(subelement, LTChar):
                        text += subelement.get_text()
    #remove any "\n" and replace it with " "
    text = text.replace("\n", " ")
    text = text.replace("-\n", "")
    #get rid off double and triple spaces
    text = " ".join(text.split())
    return text.encode("utf-8")
#Function to get the thumbnail of the file
def get_thumbnail_from_pdf(pdf_file_path):
    """this function take the path of a pdf file and return the thumbnail of the first page of the pdf file as a base64 string
    it uses the fitz library to extract the image of the first page of the pdf file
    the image is then converted to a base64 string
    """
    #open the pdf file
    pdf = fitz.open(pdf_file_path)
    #get the first page of the pdf file
    first_page = pdf[0]
    #get the image of the first page
    image = first_page.get_pixmap()
    
    return image.tobytes()
    

def process_pdf_file(pdf_file_path):
    """this function take the path of a pdf file and return a dictionary that contains the title , the abstract , the keywords , the authors , the institutions , the references and the inner text of the pdf file"""
    return extract_sections_from_pdf_gpt3(pdf_file_path)





