##################################################################################################################################
# Create JSON From Separated by Tab File
#
# By: Matheus Siqueira Barros
# Date: July, 6th of 2016
##################################################################################################################################
# Before run the script replace all the " by Space
##################################################################################################################################    
# MAIN SCRIPT 
##################################################################################################################################
TheFileInput = open("InfoMapa.txt","r") # Read the file in a given pathway
TheFileOutput = open("ComunidadesClick.json","w") # Create the file in a defined pathway


LineNumber = 0 # Counter to check the number of the line in the file to read
TheLine = TheFileInput.readline() # Read the first line of the Reading's file
TheLine = TheLine.strip() # remove \n and/or \r for each sides of the line (With out it the program will jump 1 line)

  
while ((TheLine!="") and (LineNumber<10000)): # "" means empty string
    if LineNumber == 0:
        Header_Line = TheLine.split("\t") 
        print Header_Line
    else:
        ElementsRow = TheLine.split("\t") # Split the Data 
        print ElementsRow
        TheFileOutput.write("case \""+ElementsRow[0]+"\":\n")
        for index in range(len(Header_Line)):
            if (index != 0):
                FistLetter_Capitalized_WithoutSpaces = str(ElementsRow[index])
                if (index != 1): FistLetter_Capitalized_WithoutSpaces = ((str(ElementsRow[index])).capitalize())
                TheFileOutput.write("\tProperties_Comu.push(\""+FistLetter_Capitalized_WithoutSpaces+"\");")
                TheFileOutput.write("\n")
        TheFileOutput.write("\tbreak;\n\n")
                    
        

        ############################################################################################################  
    TheLine = TheFileInput.readline()# Move to the next line Reading's file
    TheLine = TheLine.strip() # remove \n and/or \r for each sides of the line (With out it the program will jump 1 line)
    LineNumber += 1


print "Finished"
TheFileOutput.close() # Close the file that this program crated
TheFileInput.close() # Close the file this program used to read