// wzorzec: IIFE - Immediately Invoked Function Expression
// Top-Level await/async znajduje sie w fazie 3 (z 4) i bedzie niedlugo dostepne w standardzie: https://github.com/tc39/proposal-top-level-await
// Obecnie dziala eksperymentalna flaga --experimental-repl-await
// Proces dodawnaia nowych rzeczy do ES: https://2ality.com/2015/11/tc39-process.html

( async () => {
    const mongoose = require('./mongoose.service');
    const {Manufacturer} = require('./manufacturer.model');
    const {EngineTypes} = require("./engine.model");
    const {Car} = require("./car.model");

    {
        // Dodanie producenta - wersja async/await
        try {
            const manufacturer = await Manufacturer.create({
                name: 'Opel'
            });
            console.log(`Utworzono producenta: ${manufacturer._id}`)
        } catch (e) {
            // Blad 'Duplicate key error'
            if(e.code === 11000) console.error('Taka firma jest juz w bazie!')
        }
    }

    {
        // Dodawanie producenta - wersja z callbackami
        Manufacturer.create({
            name: 'Volkswagen'
        }).then(manufacturer => {
            console.log(`Utworzono producenta: ${manufacturer._id}`)
        }).catch(e => {
            // Blad 'Duplicate key error'
            if(e.code === 11000) console.error('Taka firma jest juz w bazie!')
        }).finally(() => {
            console.log("Cos co sie wydarzy zawsze")
        })
    }

    {
        // Wyszukanie producenta i jego edycja
        const manufacturer = await Manufacturer.findOne({name: 'Fiat'});
        if(manufacturer){
            manufacturer.name = 'Volkswagen';
            try {
                await manufacturer.save()
            } catch (e) {
                // Obsluga bledu!
            }
        } else {
            console.error('Nie znaleziono producenta');
        }
    }

    {
        // Utworzenie samochodu
        const manufacturer = await Manufacturer.findOne({name: 'Volkswagen'});
        if(manufacturer){
            // Model mozna utworzyc rowniez alternatywnie:
            const car = new Car({
                model: 'Passat V',
                engine: {
                    type: EngineTypes.diesel,
                    power: 205
                },
                productionStarted: 2005,
                inProduction: false,
                manufacturer
            });
            await car.save();
        } else {
            console.error('Nie znaleziono producenta');
        }
    }

    {
        // Znajdz Passat VI
        const cars = await Car.find({model: 'Passat V'});
        console.log(cars);      // jesli nic nie znaleziono - lista bedzie pusta!
    }

    {
        // Znajdz wszystkie Passaty
        const cars = await Car.find({model:  { $regex: /Passat/, $options: 'i' }});
        console.log(cars);
    }

    {
        // Znajdz samochody z silnikami o mocy wiekszej niz 200 KM
        const cars = await Car.find({'engine.power' : { $gt : 200}});
        console.log(cars);
    }

    {
        // Znajdz samochody z silnikami benzynowymi o mocy wiekszej niz 150 KM ktore sa ciegle w produkcji
        // Dodatkowo pobierz dane o producencie
        const cars = await Car.find({
            $and: [
                {'engine.power' : {$gt : 150}},
                {'engine.type' : EngineTypes.gasoline},
                {'inProduction': true}
            ]
        }, [
            'model'    // opcjonalnie pola ktore maja zostac zwrocone
        ]).populate('manufacturer', ['name']);          // nazwa pola referencji oraz opcjonalnie klucze pól które mają zostać zwrócone
        console.log(cars);

        // UWAGA: Populate dziala naiwnie wykonujac dodatkowe zapytanie find({_id: { $in: []}}) aby pobrac dane!
    }

    {
        // Referencje w Mongo nie sa tozsame z pojeciem Relacją w SQL. generalnie sprowadza sie to do pola o typie ObjectId
        // Aby pobrac wszystkie samochody nalezace do Volkswagen nalezy skorzystac z agregacji

        const cars = await Car.aggregate([
            {
                "$lookup":          // odpowiednik JOIN
                    {
                        localField: 'manufacturer',
                        from: 'manufacturers',
                        foreignField: '_id',
                        as: 'ManufacturerInfo'
                    },
            },
            {
                "$match":           // odpowiednik WHERE
                    {
                        'ManufacturerInfo.name': 'Volkswagen'
                    }
            },
            // {
            //     '$unwind': '$ManufacturerInfo'
            // },
        ]);

        // UWAGA: lookup zawsze tworzy tablice, wiec ManufacturerInfo jest tablica jednoelementowa, jesli chcemy przejsc na obiekt nalezy uzyc dodatkowego etapu $unwind
        console.log(cars);
    }

    // mongoose.disconnect()       // w aplikacjach CLI nalezy sie rozlaczyc z baza (inaczej nie zakonczy sie proces). Nie robimy tego w aplikacjach WEB
                                   // w przypadku kodu opartego o callbacki - funkcja musi byc w CB bo inaczej zamkniemy polaczenie przed zakonczeniem operacji na bazie!

})();
