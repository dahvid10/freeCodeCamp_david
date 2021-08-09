#create category class
class Category:
    # method: initialize object
    def __init__(self, catName):
        self.name = catName
        self.ledger = []
    
    # method: print object info
    def __repr__(self):
        # variable: list for object info
        infoList = []
        # variable: string for object info
        infoString = ''
        # CENTER CATEGORY NAME
        # find length of name
        nameLength = len(self.name)
        # find number of asterisks to print
        totAst = 30 - nameLength
        # find number of * to print on left and right
        if(totAst % 2 == 0):
            left = totAst / 2
            right = left
        else: 
            left = (totAst / 2)
            right = left + 1
        # store centered category name
        categoryName = '*'*int(left) + self.name + '*'*int(right) + '\n'
        infoList.append(categoryName)

        # LIST ITEMS IN LEDGER
        for item in range(len(self.ledger)):
            # get description
            itemDesc = self.ledger[item]['description']
            # make description 23 characters long
            newItemDesc = ''
            for i in range (23):
                try: 
                    itemDesc[i]
                    newItemDesc += itemDesc[i]
                except: 
                    newItemDesc += ' '
            
            # get amount
            itemAmount = float(self.ledger[item]['amount'])
            itemAmount = "{:,.2f}".format(itemAmount)
            # find length of amount
            amtLength = len(itemAmount)
            
            # if (amtLength > 7), make it 7
            if(amtLength > 7):
                itemAmount = itemAmount[amtLength - 7:]
                amtLength = len(itemAmount)
            else:
                # find length of buffer
                bufLength = 7 - amtLength
                # make buffer
                buff = ''
                # add buffer to make amtLength 7
                if(bufLength > 0): 
                    for i in range(bufLength):
                        buff += ' '                    
                itemAmount = buff + itemAmount

            descAndAmount = newItemDesc + itemAmount + '\n'
            infoList.append(descAndAmount)
        
        # variable: info about balance 
        totalString = 'Total: ' + str(self.get_balance())
        
        # add info about balance to infoList
        infoList.append(totalString)

        # add contents of infoList to infoString
        for i in range(len(infoList)):
            infoString += infoList[i]

        # return infoString
        return infoString

    # method: identify category
    def id(self):
        return self.name

    # method: deposit
    def deposit(self, amt, desc=''): 
        # if no desc is given, default to empty string
        if desc is None:
            desc = ''
        # append object w/ amt and desc to ledger
        self.ledger.append({"amount": amt, "description": desc})
    
    # method: withdraw
    def withdraw(self, amt, desc=''):
        # if (no desc is given), default to empty string
        if desc is None:
            desc = ''
        # if (insufficient funds), return false
        if(not self.check_funds(amt)):
            return False
        else: 
            # append object w/ withdrawal and desc to ledger
            self.ledger.append({"amount": -amt, "description": desc})
            return True

    # method: transfer
    def transfer(self, amt, cat):
        # if source category has enough funds, transfer
        if(self.check_funds(amt)):
            # withdraw from source category
            self.withdraw(amt, 'Transfer to ' + cat.name)
            # deposit to destination category
            cat.deposit(amt, 'Transfer from ' + self.name)
            return True
        else:
            return False

    # method: get balance
    def get_balance(self):
        # variable: funds
        balance = 0
        # calculate funds
        for transaction in self.ledger:
            balance += transaction['amount']
        return balance

    # method: check if funds allow transaction
    def check_funds(self,amt):
        # if amount is greater than balance, return false
        if(amt > self.get_balance()):
            return False
        else: 
            return True

    # method: print ledger
    def print_ledger(self):
        print(self.name, '\n', self.ledger)

    # method: get total of withdrawals
    def get_withdrawals(self):
        totWithdrawals = 0
        for transaction in range(len(self.ledger)):
            if(self.ledger[transaction]['amount'] < 0):
                totWithdrawals += self.ledger[transaction]['amount']

        return abs(totWithdrawals)

def create_spend_chart(categories):
    # variable: string for chart
    chart = ''
    # variable: list for chart contents
    chartList = []
    # variable: string for chart's title
    title = 'Percentage spent by category\n'
    # add chart's title to list for chart's contents
    chartList.append(title)
    # capture categories, categories' expenses, and total expenses
    [ catExpenses, totExpenses ] = catExpensesTot(categories)
    #capture categories and categories' expense percentage
    catExpPerc = catExpPercent(catExpenses, totExpenses)
    # print bar chart 
    barFramePercentages = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
    for i in range(len(barFramePercentages)):
        percentage = barFramePercentages[i]
        if percentage == 100:
            chartList.append(str(percentage))
            chartList.append('|')
        elif percentage < 100 and percentage > 0:
            chartList.append(' ')
            chartList.append(str(percentage))
            chartList.append('|')
            chartList.append(bars(catExpPerc, percentage))
        else: 
            chartList.append('  ')
            chartList.append(str(percentage))
            chartList.append('|')
            chartList.append(bars(catExpPerc, percentage))
        chartList.append('\n')

    chartList.append(' '*4)
    chartList.append('-'*(3*len(catExpPerc) + 1))
    chartList.append('\n')
    
    # variable: list of categories to print
    catList = listCat(catExpPerc)

    for i in range(len(catList)):
        chartList.append(catList[i])

    # add contents in chart's list to chart's string
    for i in range(len(chartList)):
        chart += chartList[i]
    # return chart's string
    return chart

# capture categories, categories' expenses, and total expenses
def catExpensesTot(categories):
    # capture expenses for each category
    catExpenses = []
    # capture total expenses for all categories
    totExpenses = 0
    # capture categories, categories' expenses, and total expenses
    for category in range(len(categories)):
        # print(categories[category].id())
        # print(categories[category].get_withdrawals())        
        catExpenses.append({"category": categories[category].id(), "total withdrawals": categories[category].get_withdrawals()})
        totExpenses += categories[category].get_withdrawals()
    
    return [catExpenses, totExpenses]

# capture categories and categories' expense percentages
def catExpPercent(catExpenses, totExpenses):
    catExpPerc = []
    for category in range(len(catExpenses)):
        categoryName = catExpenses[category]['category']

        catExpensePercent = round(((catExpenses[category]['total withdrawals'] / totExpenses) * 100) / 10) * 10

        catExpPerc.append({ "category": categoryName, "Percentage": catExpensePercent})
    # print(catExpPerc)
    return catExpPerc

# capture list of categories to print
def listCat(catExpPerc):
    # variable: list of categories to print
    catList = []
    # find length of longest category name
    # variable: length of category with longest name
    maxChar = 0
    for i in range(len(catExpPerc)):
        if(len(catExpPerc[i]['category']) > maxChar):
            maxChar = len(catExpPerc[i]['category'])
    # print categories
    for i in range(maxChar):
        catList.append(' '*5)
        for char in range(maxChar):
            # if catExpPerc[char]['category'][i] == 
            try:
                catList.append(catExpPerc[char]['category'][i])
                catList.append('  ')
            except:
                catList.append('   ')
        catList.append('\n')
    return catList

# capture bars for each percentage
def bars(catExpPerc, percentage):
    # variable: list of bars to print
    barList = []
    # variable: string of bars to print
    bars = ''
    # determine bar distribution
    for category in range(len(catExpPerc)):
        # if category percentage >= bar chart percentage, give bars to category
        if(catExpPerc[category]['Percentage'] >= percentage):
            if category == 0:
                barList.append(' ')
                barList.append('o')
            else:
                barList.append('  ')
                barList.append('o')
        else:
            if category == 0:
                barList.append('  ')
            else:
                barList.append('   ')
    # add contents in bar's chart to bar's list
    for i in range(len(barList)):
        bars += barList[i]
    # return string of bars to print
    return bars



# TEST: deposit, withdraw, transfer, create_spend_chart
fd = Category('Food')
ut = Category('Utility')
rnt = Category('Housing')
auto = Category('Auto')

fd.deposit(100, 'birthday party')
fd.deposit(50, 'weekend trip')
fd.withdraw(25.39, 'Saturday brunch')

# ut.deposit(30001.56, 'Q1 utility')
ut.deposit(300.56, 'Q1 utility')
ut.withdraw(70, 'monthly bill')
ut.transfer(50, fd)
print(ut, '\n')

rnt.deposit(1500, 'initial deposit')
rnt.withdraw(500)

auto.deposit(2000, 'initial deposit')
auto.withdraw(1000, 'pay down debt')

ch = create_spend_chart([fd, ut, rnt, auto])
print(ch)