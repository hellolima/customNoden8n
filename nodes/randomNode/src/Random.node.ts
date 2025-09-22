import type { INodeType, INodeTypeDescription, INodeExecutionData, IExecuteFunctions, NodeConnectionType } from 'n8n-workflow';
import axios from 'axios';

async function fetchRandomNumber(min: number, max: number): Promise<number> {
    const response = await axios.get(
        `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
    );
    return parseInt(response.data, 10);
}

function validateRange(min: number, max: number): string | null {
    if (typeof min !== 'number' || typeof max !== 'number') {
        return 'Minimum and maximum must be numbers';
    }
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        return 'Minimum and maximum must be integers';
    }
    if (min >= max) {
        return 'Minimum value must be less than maximum value';
    }
    return null;
}

function createErrorItem(error: string, min: number, max: number): INodeExecutionData {
    return { json: { error, min, max } };
}

export class Random implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Random',
        name: 'random',
        icon: 'file:Random.svg',
        group: ['transform'],
        version: 1,
        description: 'Generates random numbers using Random.org API',
        defaults: {
            name: 'Random',
        },
        inputs: ['main' as NodeConnectionType],
        outputs: ['main' as NodeConnectionType],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'True Random Number Generator',
                        value: 'trueRandom',
                        description: 'Generate a true random number from Random.org',
                    },
                ],
                default: 'trueRandom',
            },

            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 1,
                description: 'Minimum value',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['trueRandom'],
                    },
                },
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 10,
                description: 'Maximum value',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['trueRandom'],
                    },
                },
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i) as string;

            if (operation === 'trueRandom') {
                const min = this.getNodeParameter('min', i) as number;
                const max = this.getNodeParameter('max', i) as number;

                const errorMsg = validateRange(min, max);
                if (errorMsg) {
                    this.logger.error(errorMsg, { min, max });
                    returnData.push(createErrorItem(errorMsg, min, max));
                    continue;
                }

                try {
                    const randomNumber = await fetchRandomNumber(min, max);
                    returnData.push({ json: { randomNumber, min, max } });
                } catch (error) {
                    const msg = (error as Error).message || 'Unknown API error';
                    this.logger.error('Failed to access the Random.org API', { error });
                    returnData.push(createErrorItem(msg, min, max));
                }
            } else {
                const unknownOpMsg = `Unknown operation: ${operation}`;
                this.logger.warn(unknownOpMsg);
                returnData.push({ json: { error: unknownOpMsg } });
            }
        }
        return [returnData];
    }
}