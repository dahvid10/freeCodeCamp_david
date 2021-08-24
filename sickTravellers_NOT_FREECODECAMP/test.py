with open('input.txt') as file:
    lines = file.readlines()
    cleanLines = []
    for line in lines:
        line = line.strip()
        cleanLines.append(line)
    file.close()

# create copy of cleanLines
travellersList = cleanLines[1:]

# capture number of travellers
numTravellers = cleanLines[0]

# initialize day
day = 0

# create traveller class
class Traveller:
    name = ''
    status = ''
    route = ''
    city = ''
    def __init__(self, name, status, route):
        self.name = name
        self.status = status
        self.route = route.split('-') # list of route

# method: update travellers' city
def updateCity():
    for traveller in travellers:
        traveller.city = traveller.route[day % len(traveller.route)]

# method: update travellers' health status
def updateTravellerStatus():
    for traveller in travellers:
        if(traveller.status == 'sick'):
            # if traveller was sick, they are now recovering
            traveller.status = 'recovering'
        elif(traveller.status == 'recovering'):
            # else if traveller was recovering, they are now healthy
            traveller.status = 'healthy'
        elif(cityHealth[traveller.city] == 'sick' or cityHealth[traveller.city] == 'recovering'):
            # else if traveller was healthy and are in a city that is sick or recovering, they are now sick
            traveller.status = 'sick'

# method: update cities' health status
def updateCityHealth():
    # default all cities' health status to be healthy
    for city in cityHealth:
        if (cityHealth[city] == 'sick'):
            cityHealth[city] = 'healthy'

    # if traveller is sick or recovering, make traveller's city health status to be sick
    for traveller in travellers:
        if(traveller.status == 'sick' or traveller.status == 'recovering'):
            cityHealth[traveller.city] = 'sick'

# method: show traveller status
def showTravellerStatus():
    for traveller in travellers:
        travellerStatus[traveller.name] = traveller.status
    
    print(travellerStatus, '\n')

travellerStatus = {}

# create traveller object for each traveller
travellers = []
for traveller in travellersList:
    travellerInfo = traveller.split( )
    travellers.append(Traveller(travellerInfo[0], travellerInfo[1], travellerInfo[2]))
    
# sort list of travellers alphabetically
travellers.sort(key=lambda x: x.name)

# update travellers' city
updateCity()

# capture initial health status for cities
cityHealth = {}

# capture unique cities from all travellers' routes
for traveller in travellers:
    for city in traveller.route:
        if(city not in cityHealth.keys()):
            cityHealth[city] = ''

# initialize health of each city
for traveller in travellers:
    # if traveller's status is 'sick', make city health status 'sick'
    if(traveller.status == 'sick' or traveller.status == 'recovering'):
        cityHealth[traveller.city] = 'sick'
    
# make all other cities' health status 'healthy'
for city in cityHealth:
    if(cityHealth[city] == ''):
        cityHealth[city] = 'healthy'

# initialize condition of all healthy or day 100 to be false
healthyOr100 = False
# initialize lists to hold last people to recover, sick people, and sick cities
lastRecover = []
sickPeople = []
sickCity = []

# algorithm for simulation
# while day is less than 100 and all people aren't healthy nor is it day 100, loop simulate travel
while((day < 99) and (not healthyOr100)):
    lastRecover = sickPeople
    sickPeople = []
    sickCity = []

    # showTravellerStatus()

    # print(cityHealth, '\n')

    # print('*'*72)

    # update day
    day += 1

    # update travellers' health status
    updateTravellerStatus()

    # update city
    updateCity()

    # update city health
    updateCityHealth()

    # showTravellerStatus()

    # print(cityHealth, '\n')
    
    for traveller in travellers:
        if(traveller.status == 'sick' or traveller.status == 'recovering'):
            sickPeople.append(traveller.name)
            sickCity.append(traveller.city)

    if( (len(sickPeople) == 0) or (day == 99) ):
        healthyOr100 = True

# create string to return: last people to recover or sick people and days passed
returnString = ''
for traveller in lastRecover:
    returnString += traveller
    returnString += ' '

returnString += (str(day - 1))
print(returnString)