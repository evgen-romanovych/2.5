const { Client } = require('pg');

async function main() {
    const client = new Client({
        host: 'surus.db.elephantsql.com',
        port: 5432,
        database: 'iiypgvhw',
        user: 'iiypgvhw',
        password: 'Ehi-avgvbH-GU06aFXtOZPMEvMwZbH_S',
    });

    try {
        await client.connect();
        
        const res = await client.query('SELECT NOW() as ttt');
        console.log(res.rows[0]); 

        await createTable(); 
        await insertData(client); 

    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        await client.end();
    }
}

async function createTable() {
    const client = new Client({
        host: 'surus.db.elephantsql.com',
        port: 5432,
        database: 'iiypgvhw',
        user: 'iiypgvhw',
        password: 'Ehi-avgvbH-GU06aFXtOZPMEvMwZbH_S',
    });

    try {
        await client.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS djurnal (
                id SERIAL PRIMARY KEY,
                student_name VARCHAR(255)
            )
        `);
        await client.query(`
            CREATE TABLE IF NOT EXISTS lesson_hours (
                id SERIAL PRIMARY KEY,
                start_time TIME NOT NULL,
                end_time TIME NOT NULL
            )
        `)
        console.log('Table "djurnal" created successfully.');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        await client.end();
    }
}

async function insertData(client) {
    try {
        const data = [
            ["Дмитро Андрейко"],
            ["Едуард Бабчук"],
            ["Андрій Ванджуляк"],
            ["Владислав Василенко"],
            ["Михайло Василик"],
            ["Андрій Василюк"],
            ["Олександр Гоголь"],
            ["Василь Гуменяк"],
            ["Володимир Деделюк"],
            ["Стефан Добровольський"],
            ["Назар Зіняк"],
            ["Олена Каличак"],
            ["Станіслав Квятковський"],
            ["Денис Клим"],
            ["Василь Косило"],
            ["Олександра Лаврук"],
            ["Ігор Мілінчук"],
            ["Василь Мохнатчук"],
            ["Володимир Нижник"],
            ["Всеволод Паращин"],
            ["Олександр Партика"],
            ["Євген Романович"],
            ["Денис Слободянюк"],
            ["Марія Смалюх"]
        ];

        for (const item of data) {
            await client.query(`
                INSERT INTO djurnal (student_name)
                VALUES ($1)
            `, [item[0]]);
        }

        console.log('Sample data inserted into "djurnal" table successfully.');

    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

main().catch(console.error);