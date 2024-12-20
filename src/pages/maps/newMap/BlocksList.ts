
export interface IBlock {

    id: number
    variant: Array<{
        name: string,
        path: string[]

    }>
    statusCount: number
    filter: 'floor' | 'wall' | 'chest' | 'door'| 'border'|'mob'
    size: {
        X: number,
        Y: number
    }
    renderLevel: number,
    type: 'floor' | 'prop' | 'wall'|'mob'
}

export const BlocksList: IBlock[] = [
    {
        id: 0,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'A1 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_A1.jpg'
                ]
            },
            {
                name: 'A2 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_A2.jpg'
                ]
            },
            {
                name: 'A3 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_A3.jpg'
                ]
            },
            {
                name: 'A1 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_A1.jpg'
                ]
            },
            {
                name: 'A2 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_A2.jpg'
                ]
            },
            {
                name: 'A3 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_A3.jpg'
                ]
            },
            {
                name: 'A1 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_A1.jpg'
                ]
            },
            {
                name: 'A2 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_A2.jpg'
                ]
            },
            {
                name: 'A3 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_A3.jpg'
                ]
            },
            {
                name: 'A1 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_A1.jpg'
                ]
            },
            {
                name: 'A2 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_A2.jpg'
                ]
            },
            {
                name: 'A3 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_A3.jpg'
                ]
            },
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 1,
            Y: 1
        }
    },
    {
        id: 1,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'B1 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_B1.jpg'
                ]
            },
            {
                name: 'B2 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_B2.jpg'
                ]
            },
            {
                name: 'B3 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_B3.jpg'
                ]
            },
            {
                name: 'B1 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_B1.jpg'
                ]
            },
            {
                name: 'B2 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_B2.jpg'
                ]
            },
            {
                name: 'B3 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_B3.jpg'
                ]
            },
            {
                name: 'B1 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_B1.jpg'
                ]
            },
            {
                name: 'B2 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_B2.jpg'
                ]
            },
            {
                name: 'B3 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_B3.jpg'
                ]
            },
            {
                name: 'B1 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_B1.jpg'
                ]
            },
            {
                name: 'B2 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_B2.jpg'
                ]
            },
            {
                name: 'B3 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_B3.jpg'
                ]
            },
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 1,
            Y: 1
        }
    },
    {
        id: 2,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'C1 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_C1.jpg'
                ]
            },
            {
                name: 'C2 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_C2.jpg'
                ]
            },
            {
                name: 'C3 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_C3.jpg'
                ]
            },
            {
                name: 'C1 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_C1.jpg'
                ]
            },
            {
                name: 'C2 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_C2.jpg'
                ]
            },
            {
                name: 'C3 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_C3.jpg'
                ]
            },
            {
                name: 'C1 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_C1.jpg'
                ]
            },
            {
                name: 'C2 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_C2.jpg'
                ]
            },
            {
                name: 'C3 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_C3.jpg'
                ]
            },
            {
                name: 'C1 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_C1.jpg'
                ]
            },
            {
                name: 'C2 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_C2.jpg'
                ]
            },
            {
                name: 'C3 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_C3.jpg'
                ]
            },
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 1,
            Y: 1
        }
    },
    {
        id: 3,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'D1 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_D1.jpg'
                ]
            },
            {
                name: 'D1 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_D1.jpg'
                ]
            },
            {
                name: 'D1 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_D1.jpg'
                ]
            },
            {
                name: 'D1 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_D1.jpg'
                ]
            },
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 1,
            Y: 1
        }
    },
    {
        id: 4,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'E1 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_E1.jpg'
                ]
            },
            {
                name: 'E2 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_E2.jpg'
                ]
            },
            {
                name: 'E1 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_E1.jpg'
                ]
            },
            {
                name: 'E2 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_E2.jpg'
                ]
            },
            {
                name: 'E1 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_E1.jpg'
                ]
            },
            {
                name: 'E2 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_E2.jpg'
                ]
            },
            {
                name: 'E1 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_E1.jpg'
                ]
            },
            {
                name: 'E2 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_E2.jpg'
                ]
            },
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 1,
            Y: 1
        }
    },
    {
        id: 5,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'F1 Blue',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Blue_F1.jpg'
                ]
            },
            {
                name: 'F1 Gray',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Gray_F1.jpg'
                ]
            },
            {
                name: 'F1 Green',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Green_F1.jpg'
                ]
            },
            {
                name: 'F1 Purple',
                path: [
                    '/assets/Ceremorph/Textures/Ceremorph_Purple_F1.jpg'
                ]
            },
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 1,
            Y: 1
        }
    },
    {
        id: 6,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Straight 1x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_1x2_A.png'
                ]
            },
            {
                name: 'Dungeon Straight 1x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_1x2_B.png'
                ]
            },
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X: 1,
            Y: 2
        }
    },
    {
        id: 7,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Straight 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_2x2_A.png'
                ]
            },
            {
                name: 'Dungeon Straight 2x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_2x2_B.png'
                ]
            },
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X: 2,
            Y: 2
        }
    },
    {
        id: 8,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner In 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_2x2_A.png'
                ]
            },
            {
                name: 'Corner In 2x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_2x2_B.png'
                ]
            },
            {
                name: 'Corner In 2x2 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_2x2_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:2,
            Y:2
        }
    },
    {
        id: 9,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner In 3x3 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_3x3_A.png'
                ]
            },
            {
                name: 'Corner In 3x3 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_3x3_B.png'
                ]
            },
            {
                name: 'Corner In 3x3 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_3x3_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:3,
            Y:3
        }
    },
    {
        id: 10,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner In 4x4 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_4x4_A.png'
                ]
            },
            {
                name: 'Corner In 4x4 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_4x4_B.png'
                ]
            },
            {
                name: 'Corner In 4x4 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_4x4_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:4,
            Y:4
        }
    },
    {
        id: 11,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'Black Tile',
                path: [
                    '/assets/modularTileSet/Dungeon1/Black_Patch.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 1,
            Y: 1
        }
    },
    {
        id: 12,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Straight 2x3 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_2x3_A.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X: 2,
            Y: 3
        }
    },
    {
        id: 13,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner Out 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_2x2_A.png'
                ]
            },
            {
                name: 'Corner Out 2x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_2x2_B.png'
                ]
            },
            {
                name: 'Corner Out 2x2 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_2x2_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:2,
            Y:2
        }
    },
    {
        id: 14,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner Out 3x3 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_3x3_A.png'
                ]
            },
            {
                name: 'Corner Out 3x3 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_3x3_B.png'
                ]
            },
            {
                name: 'Corner Out 3x3 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_3x3_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:3,
            Y:3
        }
    },
    {
        id: 15,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner Out 4x4 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_4x4_A.png'
                ]
            },
            {
                name: 'Corner Out 4x4 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_4x4_B.png'
                ]
            },
            {
                name: 'Corner Out 4x4 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_4x4_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:4,
            Y:4
        }
    },
    {
        id: 16,
        statusCount: 1,
        filter: 'door',
        variant: [
            {
                name: 'Dungeon Wooden Door 1x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Door_1x2_A.png'
                ]
            },
            {
                name: 'Dungeon Wooden Door 1x2  B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Door_1x2_B.png'
                ]
            },
            {
                name: 'Dungeon Wooden Door 1x2 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Door_1x2_C.png'
                    
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'prop',
        size: {
            X:1,
            Y:2
        }
    },
    {
        id: 17,
        statusCount: 1,
        filter: 'door',
        variant: [
            {
                name: 'Dungeon Wooden Double Door 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Double_Door_2x2_A.png'
                ]
            },
            {
                name: 'Dungeon Wooden Double Door 2x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Double_Door_2x2_B.png'
                ]
            },
            {
                name: 'Dungeon Wooden Double Door 2x2 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Double_Door_2x2_C.png'
                    
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'prop',
        size: {
            X:2,
            Y:2
        }
    },
    {
        id: 18,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Connector 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Connector_2x2.png'
                ]
            },       
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:2,
            Y:2
        }
    },
    {
        id: 19,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall End Piece 1x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_End_Piece_1x2_A.png'
                ]
            },            
            {
                name: 'Dungeon Wall End Piece 1x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_End_Piece_1x2_B.png'
                ]
            },            
                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:1,
            Y:2
        }
    },
    {
        id: 20,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Fix A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_1.png'
                ]
            },                        
            {
                name: 'Dungeon Wall Fix B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_2.png'
                ]
            },                        
            {
                name: 'Dungeon Wall Fix C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_3.png'
                ]
            },                        
            {
                name: 'Dungeon Wall Fix D',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_4.png'
                ]
            },                        
            {
                name: 'Dungeon Wall Fix E',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_5.png'
                ]
            },                        
            {
                name: 'Dungeon Wall Fix F',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_6.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:1,
            Y:1
        }
    },
    {
        id: 21,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Straight 1x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Straight_1x1.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:1,
            Y:2
        }
    },
    {
        id: 22,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Straight 2x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Straight_2x2.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:2,
            Y:2
        }
    },
    {
        id: 23,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Straight 3x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Straight_3x2.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:3,
            Y:2
        }
    },
    {
        id: 24,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Straight 4x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Straight_4x2.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:4,
            Y:2
        }
    },
    {
        id: 25,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Crossroad 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Crossroad_2x2_A.png'
                ]
            },            
            {
                name: 'Dungeon Wall Crossroad 2x2 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Crossroad_2x2_B.png'
                ]
            },                             
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:2,
            Y:2
        }
    },
    {
        id: 26,
        statusCount: 1,
        filter: 'mob',
        variant: [
            {
                name: 'King Of Rats',
                path: [
                    'https://i.pinimg.com/736x/5a/bc/55/5abc559179cd4a901d7a15c9616f85c8.jpg'
                ]
            }                             
        ],
        renderLevel: 0,
        type: 'mob',
        size: {
            X:2,
            Y:2
        }
    },
]