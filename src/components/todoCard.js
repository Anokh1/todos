import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


export default function todoCard(id, name, title, date, done, description) {
    return (
        <Card title={title} subTitle={"Created by " + name + " on " + date + " | "} className='md:w-25rem' >
            <p className='m-0'>
                {description}
            </p>
            <Button label="Done">

            </Button>
            <Button label="Delete">

            </Button>
            <Button label="Update">

            </Button>
        </Card>
    );
}