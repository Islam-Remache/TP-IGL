# this python script meant to extract the text from the pdf file
# and print it out in the terminal
# the problem is that the pdf must have a very specific format in order to work
# for example the title must have to be fitted in a specific box
# and the same goes for the other fields , so if the pdf is not in the right format
# the script will not work


import typing
from decimal import Decimal
from borb.pdf import Document
from borb.pdf import PDF
from borb.pdf.canvas.geometry.rectangle import Rectangle
from borb.toolkit import LocationFilter
from borb.toolkit import RegularExpressionTextExtraction
from borb.toolkit import SimpleTextExtraction


def get_document_boxes(start: str, end: str):
    doc: typing.Optional[Document] = None
    # constract the stirng to search for
    search_string = start + ".*" + end
    l: RegularExpressionTextExtraction = RegularExpressionTextExtraction(search_string)
    with open("test.pdf", "rb") as in_file_handle:
        doc = PDF.loads(in_file_handle, [l])
    # check whether we have read a Document
    assert doc is not None
    # get width of the page
    w: Decimal = doc.get_page(0).get_page_info().get_width()

    # check whether we have found a match
    if len(l.get_matches()) == 0:
        return ['no match found']

    bounding_boxes = []
    # print matching groups
    for i, m in enumerate(l.get_matches()[0]):
        for r in m.get_bounding_boxes():
            r1: Rectangle = Rectangle(
                Decimal(r.get_x()),
                Decimal(r.get_y()),
                Decimal(r.get_width()),
                Decimal(r.get_height()),
            )
            bounding_boxes.append(r1)
    return bounding_boxes


def get_document_from_boxes(bounding_boxes):
    # get x,y,width,height from bounding boxes
    # as a string array containing and int values for each float
    # in the bounding box
    bounding_boxes_str = []
    result = ''
    for r in bounding_boxes:
        # convert decimal to int
        x = int(r.get_x())
        y = int(r.get_y())
        width = int(r.get_width())
        height = int(r.get_height())
        bounding_boxes_str.append(str(x))
        bounding_boxes_str.append(str(y))
        bounding_boxes_str.append(str(width))
        bounding_boxes_str.append(str(height))

        r1: Rectangle = Rectangle(
            Decimal(bounding_boxes_str[0]),
            Decimal(bounding_boxes_str[1]),
            Decimal(bounding_boxes_str[2]),
            Decimal(bounding_boxes_str[3]),
        )
        # define SimpleTextExtraction
        l0: SimpleTextExtraction = SimpleTextExtraction()

        # apply a LocationFilter on top of SimpleTextExtraction
        l1: LocationFilter = LocationFilter(r1)
        l1.add_listener(l0)

        # read the Document
        doc: typing.Optional[Document] = None
        with open("test.pdf", "rb") as in_file_handle:
            doc = PDF.loads(in_file_handle, [l1])

        # check whether we have read a Document
        assert doc is not None

        # print the text inside the Rectangle of interest
        s = l0.get_text()[0]
        # allow only one space between words
        # if there is more than one space, replace it with | to be able to split
        # if there is no space at the beginning of the string, add one
        s = s + ' '
        if s[0] != ' ':
            s = ' ' + s
        s = s.replace('  ', '|')
        result += s
        result = result.replace('  ', '|')
    print(result)


def main():
    searching_string = [
        '[tT]itle',
        '[aA]uthor',
        '[lL]’institution',
        '[aA]bstract',
        '[kK]eywords',
        '[iI]ntroduction',
        '[bB]ody'
    ]
    bounding_boxes = []
    for i in range(0, len(searching_string)):
        bounding_boxes = get_document_boxes(searching_string[i], searching_string[i])
        if bounding_boxes[0] == 'no match found':
            print(bounding_boxes[0])
            return
        else:
            get_document_from_boxes(bounding_boxes)


if __name__ == "__main__":
    main()
